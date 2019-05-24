import { scanNetwork } from "./NetworkScanner";

const log = (type, ...args) => {
  document.write(`${type}: `, ...args);
  document.write("<br>");
};

scanNetwork(log);
