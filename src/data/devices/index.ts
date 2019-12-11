import { DeviceType } from "../../Device";
import types from "./types.json";

const DeviceTypes: { [key: string]: DeviceType } = {};

for (let type in types) {
  DeviceTypes[type] = { ...types[type], ports: types[type].ports };
}

export default DeviceTypes;
export { default as commonGateways } from "./common-gateways.json";
