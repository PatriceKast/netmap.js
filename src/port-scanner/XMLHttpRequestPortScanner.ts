import PortScanner from "./PortScanner";
import PortScanManager from "../PortScanManager";

class XMLHttpRequestPortScanner implements PortScanner {
  scan(
    target: string,
    port: number,
    timeout = 500,
    emit: PortScanManager["emit"]
  ) {
    return new Promise<number | null>((resolve, reject) => {
      emit("scan-port:start", { ip: target, port });

      const request = new XMLHttpRequest();

      const onSuccess = () => {
        emit("scan-port:end", { ip: target, port, open: true });
        resolve(port);
      };
      const onFailure = () => {
        emit("scan-port:end", { ip: target, port, open: false });
        resolve(null);
      };

      request.timeout = timeout;
      request.ontimeout = onFailure;
      request.onerror = onFailure;
      request.onload = onSuccess;
      /*request.onreadystatechange = () => {
        if (request.readyState > 1) {
          //'HEADERS_RECEIVED', 'LOADING' or 'DONE'
          onSuccess();
        }
      };*/

      request.open("GET", `http://${target}:${port}`, true /* async */);
      request.send();
    });
  }
}

export default XMLHttpRequestPortScanner;
