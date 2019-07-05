import PortScan from "./PortScanner";
import PortScanManager from "../PortScanManager";

class ImagePortScanner implements PortScan {
  image = new Image();

  scan(
    target: string,
    port: number,
    timeout = 500,
    emit: PortScanManager["emit"]
  ) {
    return new Promise<number | null>((resolve, reject) => {
      emit("scan-port:start", { ip: target, port });

      const img = this.image;

      const callback = e => {
        if (img.src === "http://localhost/") return;
        img.src = "http://localhost/";
        emit("scan-port:end", { ip: target, port, open: true });
        resolve(port);
      };

      img.onerror = callback;
      img.onload = callback;

      img.src = `http://${target}:${port}`;

      setTimeout(() => {
        if (img.src === "http://localhost/") return;
        img.src = "http://localhost/";

        //this.log(`Closed Port: //${target}:${port}`);
        emit("scan-port:end", { ip: target, port, open: false });
        resolve(null);
      }, timeout);
    });
  }
}

export default ImagePortScanner;
