import NetworkScanner from "./Netmap";

const log = (type, ...args: string[]) => {
  document.write(`${type}: `, ...args);
  document.write("<br>");
};

const ns = new NetworkScanner({ log });

ns.scanNetwork();
