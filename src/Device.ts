interface Device {
  name: string;
  ipsuffix?: string;
  ports: Set<number>;
}

const DeviceTypes: { [key: string]: Device } = {
  DEFAULT: { name: "Default", ports: new Set() },
  ROUTER: { name: "Router", ipsuffix: "1", ports: new Set([80, 443]) },
  SYNOLOGY_NAS: { name: "Synology NAS", ports: new Set([5000, 5001]) },
  DATABASE: { name: "Database", ports: new Set([3306]) }
};

export const getType = (ip: string, ports: Set<number>) => {
  for (let type in DeviceTypes) {
    const device = DeviceTypes[type];

    if (typeof device.ipsuffix !== "undefined") {
      if (
        ip.substring(ip.length - device.ipsuffix.length, ip.length) !=
        device.ipsuffix
      ) {
        continue;
      }
    }

    let portsMatch = true;

    for (const port of ports) {
      if (!device.ports.has(port)) {
        portsMatch = false;
        break;
      }
    }

    if (!portsMatch) {
      continue;
    }

    return DeviceTypes[type];
  }

  return DeviceTypes.DEFAULT;
};

export const getDeviceArray = (
  ipToPorts: { [key: string]: Set<number> } = {}
) =>
  Object.keys(ipToPorts).map(ip => ({
    ip,
    ports: ipToPorts[ip],
    type: getType(ip, ipToPorts[ip])
  }));
