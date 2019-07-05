import PortScanManager from "../PortScanManager";

interface PortScanner {
  scan: (
    target: string,
    port: number,
    timeout: number,
    emit: PortScanManager["emit"]
  ) => Promise<number | null>;
}

export default PortScanner;
