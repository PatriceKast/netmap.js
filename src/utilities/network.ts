export const getRangeFromIp = (ip: string) =>
  ip.substring(0, ip.lastIndexOf(".")) + ".";
