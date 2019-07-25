import { DeviceType } from "../../Device";
import types from "./types.json";

const DeviceTypes: { [key: string]: DeviceType } = {};

for (let type in types) {
  DeviceTypes[type] = { ...types[type], ports: new Set(types[type].ports) };
}

export default DeviceTypes;
