import { commonHttpPorts, commonPorts } from "./PortDump";
import EventEmitter from "event-emitter";

class PortScanner {
  constructor() {
    //initialize image pool
    this.imgs = new Array(10).fill().map(() => new Image());
    this.enqueuedJobs = [];
    this.eventEmitter = new EventEmitter();
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
  scanPorts(ports, target, log = console.log) {
    return new Promise((resolve, reject) => {
      const openPorts = [];
      let scannedPorts = 0;

      const listener = (target, port, open = false) => {
        if (target !== target) {
          //if this isn't a job scheduled by us, we don't care
          return;
        }

        if (open) {
          openPorts.push(port);
        }

        scannedPorts++;

        if (scannedPorts >= ports.length) {
          //we scanned all given ports
          resolve(openPorts);
        }
      };

      eventEmitter.on("scanned-port", listener);

      //push all jobs
      enqueuedJobs.push(ports.map(port => ({ target, port })));

      return openPorts;
    });
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
