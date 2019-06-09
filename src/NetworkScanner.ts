import PortScanner from "./PortScanner";
import { getIps } from "./IPFetcher";
import {
  getRangeFromIp,
  DEFAULT_GATEWAYS,
  DEFAULT_RANGES
} from "./utilities/network";

const addPortsToSetMapping = (
  setMapping: { [key: string]: Set<number> },
  key: string,
  items: number[]
) => {
  if (items) {
    //if we already found open ports, add them to the set
    if (setMapping[key]) {
      items.forEach(item => setMapping[key].add(item));
    } else {
      setMapping[key] = new Set(items);
    }
  }
};

class NetworkScanner {
  log: (type: string, ...messages: string[]) => void;
  portScanner: PortScanner;

  gateways: Set<string>;
  ranges: Set<string>;

  scannedIps: Set<string> = new Set(); //
  ipToPorts: { [key: string]: Set<number> } = {}; //maps all scanned ips to the found ports

  /**
   * Creates a new instance of the class 'NetworkScanner'
   * @param {Object} options The plugin options
   */
  constructor({
    log = console.log, // eslint-disable-line no-console
    gateways = DEFAULT_GATEWAYS,
    ranges = DEFAULT_RANGES
  }) {
    this.log = log;
    this.gateways = new Set(gateways);
    this.ranges = new Set(ranges);
    this.portScanner = new PortScanner({ log });
  }

  /**
   * Scans the device with the given ip and pushes it the the passed ip array.
   * All open ports are added to ip
   */
  scanDevice = async (ip, light = true) => {
    this.log("device", `Scanning ip ${ip}`);

    const ports = await this.portScanner.scan(ip, light);
    addPortsToSetMapping(this.ipToPorts, ip, ports);
    this.scannedIps.add(ip);

    this.log("device", `Done scanning ip ${ip}`);

    return ports;
  };

  scanRange = async (range, light = true) => {
    this.log("info", `Scanning range ${range}, light: ${light}`);

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

    this.log("info", `Done scanning range ${range}`);
  };

  testGateways = async (light = true) => {
    // We again want to scan all the gateways sequentially

    /* eslint-disable no-await-in-loop */
    for (const gateway of this.gateways) {
      await this.scanDevice(gateway, light);
    }
    /* eslint-enable no-await-in-loop */
  };

  addLocalRanges = async () => {
    const ips = await getIps();

    for (const ip of ips) {
      const range = getRangeFromIp(ip);

      this.ranges.add(range);
      this.log("info", `Added local range ${range} (via ${ip})`);
    }
  };

  scanNetwork = async () => {
    await this.addLocalRanges();

    this.log("info", "Testing gateways...");
    await this.testGateways(true);
    this.log("info", "Done testing gateways...");

    // Usually doing awaits inside a loop is extremely inefficient but in this case we want
    // to sequentially scan them.

    /* eslint-disable no-await-in-loop */
    for (const range in this.ranges) {
      await this.scanRange(range, true);
    }
    for (const range in this.ranges) {
      await this.scanRange(range, false);
    }
    /* eslint-enable no-await-in-loop */
  };
}

export default NetworkScanner;
