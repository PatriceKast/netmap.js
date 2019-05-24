import { commonHttpPorts, commonPorts } from "./PortDump";
import EventEmitter from "event-emitter";

class PortScanner {
  constructor() {
    //initialize image pool
    this.imgs = new Array(10).fill().map(() => new Image());
  }

  // eslint-disable-next-line no-console
  async scan(target, light = false, log = console.log) {
    log("device", `Scan: ${target}, light: ${light}`);

    const startTime = new Date();
    const ports = light ? commonHttpPorts : commonPorts;
    const res = await this.scanPorts(ports, target, log);

    const endTime = new Date();
    const ms = Math.round(endTime - startTime);
    const portsPerSecond = Math.round((ports.length / ms) * 1000);

    log(
      "device",
      `${ms} ms for scanning ${
        ports.length
      } ports on ${target}, ${portsPerSecond} Ports / Sec`
    );

    return res;
  }

  // eslint-disable-next-line no-console
  async scanPorts(ports, target, log = console.log) {
    const openPorts = [];
    const tmpPorts = [...ports];

    /* eslint-disable no-await-in-loop */
    while (tmpPorts.length > 0) {
      const results = await Promise.all(
        tmpPorts
          .splice(0, 10)
          .map((port, index) =>
            this.checkPortUsingImage(index, port, target, log)
          )
      );

      openPorts.push(...results.filter(port => port !== null));
    }
    /* eslint-enable no-await-in-loop */

    return openPorts;
  }

  // eslint-disable-next-line no-console
  checkPortUsingImage(index, port, target, log = console.log, timeout = 500) {
    if (timeout > 1000) {
      throw new Error("Timeouts larger than 1000ms shouldn't be used!");
    }

    return new Promise((resolve, reject) => {
      log("ports", `Check Port //${target}:${port}`);
      //var img = new Image();

      this.imgs[index].onerror = () => {
        //if (!img) return;
        if (this.imgs[index].src == "http://localhost/") return;
        //img = undefined;
        this.imgs[index].src = "http://localhost/";
        log("ports", `Open Port: //${target}:${port}`);
        resolve(port);
      };

      this.imgs[index].onload = this.imgs[index].onerror;
      this.imgs[index].src = "http://" + target + ":" + port;

      setTimeout(() => {
        //if (!img) return;
        if (this.imgs[index].src == "http://localhost/") return;
        //img = undefined;
        this.imgs[index].src = "http://localhost/";
        //log(`Closed Port: //${target}:${port}`);
        resolve(null);
      }, timeout);
    });
  }
}

export default PortScanner;
