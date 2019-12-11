import EventEmitter from "events";

import PortScanManager from "./PortScanManager";
import Device from "./Device";
import { commonGateways } from "./data/devices";
import { commonPorts, commonGatewayPorts } from "./data/ports";
import { commonRanges } from "./data/ranges";

export type LoggingFunction = (type: string, ...messages: string[]) => void;

const addPortsToArrayMapping = (
  setMapping: { [key: string]: number[] },
  key: string,
  items: number[]
) => {
  if (items) {
    //if we already found open ports, add them to the set
    if (setMapping[key]) {
      items.forEach(item => setMapping[key].push(item));
    } else {
      setMapping[key] = items;
    }
  }
};

class Netmap {
  log: LoggingFunction;
  portScanManager: PortScanManager;

  gateways: string[];
  gatewayPorts: number[];
  detectRanges: string[];

  scannedIps: string[] = []; //
  ipToPorts: { [key: string]: number[] } = {}; //maps all scanned ips to the found ports
  devices: Device[] = [];

  eventEmitter: EventEmitter;

  /**
   * Creates a new instance of the class 'netmap'
   */
  constructor({
    log = console.log, // eslint-disable-line no-console
    gateways = [],
    gatewayPorts = [],
    ranges = []
  }) {
    this.log = log;
    this.gateways = gateways;
    this.gatewayPorts = gatewayPorts;
    this.detectRanges = ranges;
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
          `Done scanning ${ip}. It took ${duration} ms for scanning ${ports.length} ports, ${portsPerSecond} Ports / Sec`
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
    this.scannedIps.push(ip);
    addPortsToArrayMapping(this.ipToPorts, ip, ports);

    if (ports.length > 0) {
      const d = new Device(ip, ports);
      this.devices.push(d);
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

      if (!this.scannedIps.includes(ip)) {
        //if not already scanned
        await this.scanDevice(ip, light);
      }
    }
    /* eslint-enable no-await-in-loop */

    this.emit("scan-range:end", { range, light, scannedIps: this.scannedIps });
  };
  //public methods

  addRange = (range: string) => {
    this.detectRanges.unshift(range);
  };

  addGateway = (range: string) => {
    this.gateways.unshift(range);
  };

  addGatewayPort = (port: number) => {
    this.gatewayPorts.unshift(port);
  };

  getCommonGateways = () => commonGateways;
  getCommonGatewayPorts = () => commonGatewayPorts;
  getCommonRanges = () => commonRanges;

  scanNetwork = async () => {
    const gateways = [...this.gateways, ...commonGateways];
    const gatewayPorts = [...this.gatewayPorts, ...commonGatewayPorts];
    const ranges = [...this.detectRanges, ...commonRanges];

    let foundRange = false;

    for (const gateway of gateways) {
      for (const range of ranges) {
        const openPorts = await this.portScanManager.scanPorts(
          gatewayPorts,
          range + gateway
        );
        if (openPorts.length > 0) {
          foundRange = true;
          await this.scanRange(range, true);
          await this.scanRange(range, false);
        }
      }
    }

    return foundRange;
  };
}

export default Netmap;
