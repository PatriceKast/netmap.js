const DeviceTypes = {
  DEFAULT: { name: "Default", ipsuffix: null, ports: [] },
  ROUTER: { name: "Router", ipsuffix: 1, ports: [80, 443] },
  SYNOLOGY_NAS: { name: "Synology NAS", ipsuffix: null, ports: [5000, 5001] },
  DATABASE: { name: "Database", ipsuffix: null, ports: [3306] }
};

export const getType = (ip, ports) => {
  for (let type in DeviceTypes) {
    if (DeviceTypes[type].ipsuffix != null) {
      if (ip.split(".").slice(-1)[0] != DeviceTypes[type].ipsuffix) {
        continue;
      }
    }

    const samePorts = ports.filter(value =>
      DeviceTypes[type].ports.includes(value)
    );

    if (samePorts == null || samePorts.length == 0) {
      continue;
    }

    return DeviceTypes[type];
  }

  return DeviceTypes.DEFAULT;
};

export const getDeviceArray = (ipToPorts = {}) =>
  Object.keys(ipToPorts).map(ip => ({
    ip,
    ports: ipToPorts[ip],
    type: getType()
  }));
