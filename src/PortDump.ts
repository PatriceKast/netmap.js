import restrictedPorts from "./data/restricted-ports";
import {
  commonPorts as unfilteredCommonPorts,
  commonHttpPorts as unfilteredCommonHttpPorts
} from "./data/ports";

const isChrome = () => /Google/i.test(navigator.vendor);
const isSafari = () => /Apple/i.test(navigator.vendor);

// @ts-ignore
const isFirefox = () => ([].toSource ? true : false);
// @ts-ignore
const isEdge = () => (top.msCredentials ? true : false);

const getBrowserString = () =>
  isChrome()
    ? "Chrome"
    : isSafari()
    ? "Safari"
    : isFirefox()
    ? "Firefox"
    : isEdge()
    ? "Edge"
    : "Unsupported";

const getCommonPorts = (browser = browserString) =>
  new Set(
    unfilteredCommonPorts.filter(x => !restrictedPorts[browser].includes(x))
  );

const getCommonHttpPorts = (browser = browserString) =>
  new Set(
    unfilteredCommonHttpPorts.filter(x => !restrictedPorts[browser].includes(x))
  );

//doesn't change so we can just execute it once on load
export const browserString = getBrowserString();

export const commonHttpPorts = getCommonHttpPorts(browserString);
export const commonPorts = getCommonPorts(browserString);
