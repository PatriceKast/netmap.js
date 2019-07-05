import PortScanner from "./PortScanner";
import PortScanManager from "../PortScanManager";

class HybridFetchPortScanner implements PortScanner {
  scan(
    target: string,
    port: number,
    timeout = 2000,
    emit: PortScanManager["emit"]
  ) {
    emit("scan-port:start", { ip: target, port });

    //as soon as a timeout function is built in, we should use it. right now the issue is
    //that if we have more than the maximum amount of parallel requests, we will timeout anyways.

    //here we try to address it by redoing the request on a timeout with an xmlhttprequest.

    // https://stackoverflow.com/a/40683747
    return new Promise<number | null>((resolve, reject) => {
      const onSuccess = () => {
        emit("scan-port:end", { ip: target, port, open: true });
        resolve(port);
      };
      const onFailure = () => {
        emit("scan-port:end", { ip: target, port, open: false });
        resolve(null);
      };

      fetch(`http://${target}:${port}`, { mode: "no-cors" })
        .then(onSuccess)
        .catch(onFailure);
      setTimeout(() => {
        const request = new XMLHttpRequest();
        request.timeout = timeout;

        //if this requests also timeouts, we can say the port is closed
        request.ontimeout = onFailure;
        //if the requests succeeds, the port is obviously open
        request.onload = onSuccess;
        //if an error occurs, we do not know whether the host is down or if there was a cors error, this can only
        //be determined by fetch requests or images which both have the issue with the inaccurate timeout.
        //this means we cannot be sure what is the case but as the xmlhttprequest returned a definitive result,
        //we can initiate a fetch request *without* a timeout (actually just a really high one as the host could)
        //have gone down) and it should return a valid result
        request.onerror = () => {
          fetch(`http://${target}:${port}`, { mode: "no-cors" })
            .then(onSuccess)
            .catch(onFailure);
          setTimeout(onFailure, 10 * timeout);
        };

        request.open("GET", `http://${target}:${port}`, true /* async */);
        request.send();
      }, timeout);
    });
  }
}

export default HybridFetchPortScanner;
