import PortScanner from "./PortScanner";
import PortScanManager from "../PortScanManager";

class FetchPortScanner implements PortScanner {
  scan(
    target: string,
    port: number,
    timeout = 2000,
    emit: PortScanManager["emit"]
  ) {
    emit("scan-port:start", { ip: target, port });

    //as soon as a timeout function is built in, we should use it. right now the issue is
    //that if we have more than the maximum amount of parallel requests, we will timeout anyways.

    // https://stackoverflow.com/a/40683747
    return new Promise<number | null>((resolve, reject) => {
      fetch(`http://${target}:${port}`, { mode: "no-cors" })
        .then(() => {
          emit("scan-port:end", { ip: target, port, open: true });
          resolve(port);
        })
        .catch(() => {
          emit("scan-port:end", { ip: target, port, open: false });
          resolve(null);
        });
      setTimeout(() => {
        resolve(null);
      }, timeout);
    });
  }
}

export default FetchPortScanner;
