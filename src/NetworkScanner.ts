import EventEmitter from "events";

import PortScanManager from "./PortScanManager";
import { getIps } from "./IPFetcher";
import { getRangeFromIp } from "./utilities/network";
import Device from "./Device";

export type LoggingFunction = (type: string, ...messages: string[]) => void;

const addPortsToSetMapping = (
  setMapping: { [key: string]: Set<number> },
  key: string,
  items: Set<number>
) => {
  if (items) {
    //if we already found open ports, add them to the set
    if (setMapping[key]) {
      items.forEach(setMapping[key].add);
    } else {
      setMapping[key] = new Set(items);
    }
  }
};

class NetworkScanner {
  log: LoggingFunction;
  portScanManager: PortScanManager;

  gateways: Set<string>;
  ranges: Set<string>;

  scannedIps: Set<string> = new Set(); //
  ipToPorts: { [key: string]: Set<number> } = {}; //maps all scanned ips to the found ports
  devices: Set<Device> = new Set();

  eventEmitter: EventEmitter;

  /**
   * Creates a new instance of the class 'NetworkScanner'
   */
  constructor({
    log = console.log, // eslint-disable-line no-console
    gateways = [],
    ranges = []
  }) {
    this.log = log;
    this.gateways = new Set(gateways);
    this.ranges = new Set(ranges);
    this.eventEmitter = new EventEmitter();
    this.portScanManager = new PortScanManager({
      eventEmitter: this.eventEmitter
    });

    if (this.log) {
      this.on("scan-device:start", ({ ip }) =>
        this.log("device", `Scanning ip ${ip}`)
      );

      this.on("scan-device:end", ({ ip, duration, ports, portsPerSecond }) =>
        this.log(
          "device",
          `Done scanning ${ip}. It took ${duration} ms for scanning ${
            ports.length
          } ports, ${portsPerSecond} Ports / Sec`
        )
      );

      this.on("scan-range:start", ({ range, light }) =>
        this.log("info", `Scanning range ${range}, light: ${light}`)
      );

      this.on("scan-range:end", ({ range }) =>
        this.log("info", `Done scanning range ${range}`)
      );

      this.on("add-local-range", ({ range, ip }) =>
        this.log("info", `Added local range ${range} (via ${ip})`)
      );

      this.on("scan-gateways:start", () =>
        this.log("info", "Testing gateways...")
      );
      this.on("scan-gateways:end", () =>
        this.log("info", "Done testing gateways...")
      );

      this.on("scan-port:start", ({ ip, port }) =>
        this.log("ports", `Check Port //${ip}:${port}`)
      );
      this.on("scan-port:end", ({ ip, port, open }) => {
        if (open) {
          this.log("ports", `Open Port: //${ip}:${port}, ${open}`);
        }
      });
    }
  }

  /**
   * Makes the use of the eventEmitter easier
   */
  emit = (event: string, ...args: any[]) =>
    this.eventEmitter.emit(event, ...args);
  on = (event: string, listener: (...args: any[]) => void) =>
    this.eventEmitter.on(event, listener);
  off = (event: string, listener: (...args: any[]) => void) =>
    this.eventEmitter.off(event, listener);

  /**
   * Scans the device with the given ip and pushes it the the passed ip array.
   * All open ports are added to ip
   */
  scanDevice = async (ip: string, light = true) => {
    const ports = await this.portScanManager.scan(ip, light);
    this.scannedIps.add(ip);
    addPortsToSetMapping(this.ipToPorts, ip, ports);

    if (ports.size > 0) {
      const d = new Device(ip, ports);
      this.devices.add(d);
      this.emit("add-device", d);
    }

    return ports;
  };

  scanRange = async (range, light = true) => {
    this.emit("scan-range:start", { range, light });

    // All ips or devices have to be scanned sequentially

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < 255; i++) {
      const ip = range + i; //the new ip

      if (!this.scannedIps.has(ip)) {
        //if not already scanned
        await this.scanDevice(ip, light);
      }
    }
    /* eslint-enable no-await-in-loop */

    this.emit("scan-range:end", { range, light, scannedIps: this.scannedIps });
  };

  testGateways = async (light = true) => {
    // We again want to scan all the gateways sequentially
    this.emit("scan-gateways:start", { light, gateways: this.gateways });

    /* eslint-disable no-await-in-loop */
    for (const gateway of this.gateways) {
      await this.scanDevice(gateway, light);
    }
    /* eslint-enable no-await-in-loop */

    this.emit("scan-gateways:end", { light, gateway: this.gateways });
  };

  addLocalRanges = async () => {
    this.emit("get-local-ips:start");
    const ips = await getIps();
    this.emit("get-local-ips:end", { ips });

    this.emit("add-local-ranges:start");
    const localRanges = new Set<string>();

    for (const ip of ips) {
      const range = getRangeFromIp(ip);

      this.emit("add-local-range", { range, ip });
      localRanges.add(range);
      this.gateways.add(range + "1");
    }

    localRanges.forEach(range => this.ranges.add(range));
    this.emit("add-local-ranges:end", { localRanges });
  };

  scanNetwork = async () => {
    // const ips = await getIps();
    // for (const ip of ips) {
    //   await this.scanDevice(ip, false);
    // }

    await this.addLocalRanges();
    await this.testGateways(true);

    // Usually doing awaits inside a loop is inefficient but in this case we want
    // to sequentially scan them.

    /* eslint-disable no-await-in-loop */
    for (const range of this.ranges) {
      await this.scanRange(range, true);
    }
    for (const range of this.ranges) {
      await this.scanRange(range, false);
    }
    /* eslint-enable no-await-in-loop */
  };
}

export default NetworkScanner;
