import { commonHttpPorts, commonPorts } from "./PortDump";
import EventEmitter from "event-emitter";

class PortScanner {
  log: (type: string, ...messages: string[]) => void;

  imgs: HTMLImageElement[];

  constructor({ log }) {
    this.log = log;

    //initialize image pool
    this.imgs = new Array(10).fill(null).map(() => new Image());
  }

  // eslint-disable-next-line no-console
  async scan(target: string, light = false) {
    this.log("device", `Scan: ${target}, light: ${light}`);

    const startTime = Date.now();
    const ports = light ? commonHttpPorts : commonPorts;
    const res = await this.scanPorts(ports, target);

    const endTime = Date.now();
    const ms = Math.round(endTime - startTime);
    const portsPerSecond = Math.round((ports.length / ms) * 1000);

    this.log(
      "device",
      `${ms} ms for scanning ${
        ports.length
      } ports on ${target}, ${portsPerSecond} Ports / Sec`
    );

    return res;
  }

  // eslint-disable-next-line no-console
  async scanPorts(ports: number[], target: string) {
    const openPorts: number[] = [];
    const tmpPorts = [...ports];

    /* eslint-disable no-await-in-loop */
    while (tmpPorts.length > 0) {
      const results = await Promise.all(
        tmpPorts
          .splice(0, 10)
          .map((port, index) => this.checkPortUsingImage(index, port, target))
      );

      openPorts.push(...results.filter(port => port !== null));
    }
    /* eslint-enable no-await-in-loop */

    return openPorts;
  }

  // eslint-disable-next-line no-console
  checkPortUsingImage(
    index: number,
    port: number,
    target: string,
    timeout = 500
  ): Promise<number | null> {
    if (timeout > 1000) {
      throw new Error("Timeouts larger than 1000ms shouldn't be used!");
    }

    return new Promise((resolve, reject) => {
      this.log("ports", `Check Port //${target}:${port}`);
      const img = this.imgs[index];

      const callback = () => {
        if (img.src === "http://localhost/") return;
        img.src = "http://localhost/";

        this.log("ports", `Open Port: //${target}:${port}`);
        resolve(port);
      };

      img.onerror = callback;
      img.onload = callback;

      img.src = `http://${target}:${port}`;

      setTimeout(() => {
        if (img.src === "http://localhost/") return;
        img.src = "http://localhost/";

        //this.log(`Closed Port: //${target}:${port}`);
        resolve(null);
      }, timeout);
    });
  }
}

export default PortScanner;
