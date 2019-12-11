import DeviceTypes from "./data/devices";

export interface DeviceType {
  name: string;
  ipsuffix?: string;
  ports: number[];
}

class Device {
  ip: string;
  ports: number[];
  type: DeviceType;

  constructor(ip: string, ports: number[]) {
    this.ip = ip;
    this.ports = ports;
    this.type = Device.getType(ip, ports);
  }

  static getType = (ip: string, ports: number[]) => {
    let maxScore = 0;
    let bestMatchingType = "DEFAULT";

    for (let type in DeviceTypes) {
      const device = DeviceTypes[type];
      let score = 0;

      if (typeof device.ipsuffix !== "undefined") {
        if (
          ip.substring(ip.length - device.ipsuffix.length, ip.length) ===
          device.ipsuffix
        ) {
          score += 10;
        }
      }

      for (let port of device.ports) {
        //these ports are *required* but sysadmins could close them and our scanner doesn't have
        //a 100% accuracy => relevance search. if less than 50% match, it's not considered anymore
        //assuming we have a probability of >50% to detect an open port correctly (which we should have),
        //we expect to detect > half the ports correctly and thus end with a positive score which
        //is better than the default (0)

        if (ports.includes(port)) {
          score += 1;
        } else {
          score -= 1;
        }
      }

      //in contrast to ports detected as closed, ports which are detect as being open should always
      //be correct => monte carlo with one sided error. Having more ports open means
      //for every additional open port, we also reduce the score by one.
      for (let port of ports) {
        if (!device.ports.includes(port)) {
          score -= 1;
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestMatchingType = type;
      }
    }

    return DeviceTypes[bestMatchingType];
  };
}

export default Device;

export const getDeviceArray = (ipToPorts: { [key: string]: number[] } = {}) =>
  Object.keys(ipToPorts).map(ip => ({
    ip,
    ports: ipToPorts[ip],
    type: Device.getType(ip, ipToPorts[ip])
  }));
