export const getRangeFromIp = (ip: string) =>
  ip.substring(0, ip.lastIndexOf(".")) + ".";

export const DEFAULT_GATEWAYS = [
  "192.168.1.1",
  "192.168.178.1",
  "172.21.0.1",
  "10.0.0.1"
];

export const DEFAULT_RANGES = [
  "192.168.1.",
  "192.168.178.",
  "172.21.0.",
  "10.0.0."
];
