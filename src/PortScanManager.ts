import EventEmitter from "events";

import { commonHttpPorts, commonPorts } from "./PortDump";
import PortScanner from "./port-scanner/PortScanner";
import HybridFetchPortScanner from "./port-scanner/HybridFetchPortScanner";

class PortScanManager {
  eventEmitter: EventEmitter;

  portScanners: PortScanner[];

  constructor({ eventEmitter }: { eventEmitter: EventEmitter }) {
    this.eventEmitter = eventEmitter;

    //initialize image pool
    /*this.portScanners = new Array(50)
      .fill(null)
      .map(() => new XMLHttpRequestScanner());*/
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

  // eslint-disable-next-line no-console
  async scan(target: string, light = false) {
    this.emit("scan-device:start", { ip: target, light });

    const startTime = Date.now();
    const ports = light ? commonHttpPorts : commonPorts;
    const res = await this.scanPorts(ports, target);

    const endTime = Date.now();
    const ms = Math.round(endTime - startTime);
    const portsPerSecond = Math.round((ports.length / ms) * 1000);

    this.emit("scan-device:end", {
      ip: target,
      light,
      startTime,
      endTime,
      duration: ms,
      ports,
      portsPerSecond
    });

    return res;
  }

  // eslint-disable-next-line no-console
  async scanPorts(ports: number[], target: string, timeout = 500) {
    const openPorts: number[] = [];
    const tmpPorts = [...ports];

    /* eslint-disable no-await-in-loop */
    while (tmpPorts.length > 0) {
      const results = await Promise.all(
        tmpPorts
          .splice(
            0,
            10
          ) /* more than 50 is unreasonable for all browsers, saves some memory */
          .map((port, index) =>
            new HybridFetchPortScanner().scan(target, port, timeout, this.emit)
          )
      );
      results
        .filter(port => port !== null)
        .forEach(port => openPorts.push(port));
    }
    /* eslint-enable no-await-in-loop */

    return openPorts;
  }
}

export default PortScanManager;
