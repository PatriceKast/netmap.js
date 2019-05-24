import PortScanner from "./PortScanner";
import { getIp } from "./IPFetcher";

const ipToRange = ip => [ip.substring(0, ip.lastIndexOf(".")) + "."];

const scanDevice = async (
  ip,
  ips = [],
  ipToPorts = {},
  light = true,
  portScanner = new PortScanner(),
  log = console.log // eslint-disable-line no-console
) => {
  log("device", `Scanning ip ${ip}`);

  const ports = await portScanner.scan(ip, light, log); //Light Scan

  if (ports != null && ports.length > 0) {
    ips.push(ip);
    ipToPorts[ip] = ports;
  }

  log("device", `Done scanning ip ${ip}`);
};

const scanRange = async (
  range,
  ips = [],
  ipToPorts = {},
  portScanner = new PortScanner(),
  light = true,
  log = console.log // eslint-disable-line no-console
) => {
  log("info", `Scanning range ${range}, light: ${light}`);

  // Again all ips or devices have to be scanned sequentially

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < 255; i++) {
    if (!ips.includes(range + i)) {
      //if not already scanned
      await scanDevice(range + i, ips, ipToPorts, light, portScanner, log);
    }
  }
  /* eslint-enable no-await-in-loop */

  log("info", `Done scanning range ${range}`);
};

const defaultGateways = [
  "192.168.1.1",
  "192.168.178.1",
  "172.21.0.1",
  "10.0.0.1"
];

const testGateways = async (
  ips = [],
  ipToPorts = {},
  portScanner = new PortScanner(),
  light = true,
  log = console.log // eslint-disable-line no-console
) => {
  // We again want to scan all the gateways sequentially

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < defaultGateways.length; i++) {
    const gateway = defaultGateways[i];
    await scanDevice(gateway, ips, ipToPorts, light, portScanner, log);
  }

  /* eslint-enable no-await-in-loop */
};

const defaultRanges = ["192.168.1.", "192.168.178.", "172.21.0.", "10.0.0."];

// eslint-disable-next-line no-console
export const scanNetwork = async (log = console.log) => {
  const ipToPorts = {}; //maps an ip to the open ports
  const ranges = [];
  const ips = [];

  const portScanner = new PortScanner();
  const ip = await getIp();

  if (ip != null) {
    ranges.push(ipToRange(ip));
    ips.push(ip);
  }

  log("info", "Testing gateways...");
  await testGateways(ips, ipToPorts, portScanner, true, log);
  log("info", "Done testing gateways...");

  //Add additional ranges if they aren0t already in it

  ranges.push(
    ...defaultRanges.filter(
      additionalRange => !ranges.includes(additionalRange)
    )
  );

  // Usually doing awaits inside a loop is extremely inefficient but in this case we want
  // to sequentially scan them.

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < ranges.length; i++) {
    await scanRange(ranges[i], ips, ipToPorts, portScanner, true, log);
  }
  for (let i = 0; i < ranges.length; i++) {
    await scanRange(ranges[i], ips, ipToPorts, portScanner, false, log);
  }
  /* eslint-enable no-await-in-loop */
};
