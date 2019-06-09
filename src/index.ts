import NetworkScanner from "./NetworkScanner";

const log = (type, ...args: string[]) => {
  document.write(`${type}: `, ...args);
  document.write("<br>");
};

const ns = new NetworkScanner({ log });

ns.scanNetwork();
