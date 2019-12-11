# netmap.js

A small lightweight network scanner, written in javascript.
netmap.js is an open source penetration testing tool, written in javascript. It tries to detect local ip ranges by identifing gateways in the local network. In case an open port is found, the plugin concentrates the scans on this specific ip range. Additionally it can make guesses on the type of device, based on the list of open ports.

In case an open port is found during range detection phase, the device is saved in the local storage to provide faster gateway detection for the next scan.

Quick Setup
----

1) Include the following tag in the code of your website:
``` html
<script type="text/javascript" src="https://cdn.kastgroup.com/js/libs/netmap.js/1.0.0/netmap.min.js"></script>
```

2) Instantiate netmap.js
```javascript
const netmap = new Netmap();
```

3) Start local ip range detection and performs port scans
```javascript
netmap.scanNetwork();
```

Quick Setup
----

1) Include the following tag in the code of your website:
``` html
<script type="text/javascript" src="https://cdn.kastgroup.com/js/libs/netmap.js/1.0.0/netmap.min.js"></script>
```

2) Instantiate netmap.js
```javascript
const netmap = new Netmap();
```

Demo
----

![Screenshot](demo/demo.png)

A sample application of the netmap.js plugin can be found [here](demo/).

Installation
----

You can download the source files or the compiled file by clicking [here](https://github.com/PatriceKast/netmap.js/tarball/master).

Preferably, you can download netmap.js by cloning the [Git](https://github.com/PatriceKast/netmap.js) repository:

    git clone https://github.com/PatriceKast/netmap.js.git

Usage
----

The official releases are hosted on a CDN by KastGroup GmbH.

    https://cdn.kastgroup.com/js/libs/netmap.js/1.0.0/netmap.min.js

To use this js plugin, add the script to your webpage and create a new netmap.js object:

```html
<html>
    <head>
        <script type="text/javascript" src="https://cdn.kastgroup.com/js/libs/netmap.js/1.0.0/netmap.min.js"></script>
    </head>
    <body>
        <script>
            const netmap = new Netmap(console.log);   // Instantiate a new Netmap object
            netmap.scanNetwork();                     // Start local ip range detection and performs port scans
        </script>
    </body>
</html>
```

Documentation
----

The following ranges are defined as default:

```javascript
    [
      "10.0.0.",
      "192.168.0.",
      "172.21.0.",
      "172.16.0.",
      "192.168.1.",
      "192.168.178."
    ]
```

The following gateway ips (last byte) are defined as default:

```javascript
    ["1", "254", "20", "30", "50", "138", "227", "101", "90", "2", "3"]
```

The following gateway ports are defined as default:

```javascript
    [80, 443, 8080, 8008]
```

The following functions are avaible:

```javascript
netmap.addRange("192.168.1.")      // Adds a custom IP range to the detection queue
netmap.addGateways("1")            // Adds a custom gateway (last byte) to the detection queue
netmap.addGatewayPorts("8008")     // Adds a custom gateway port to the detection queue

netmap.scanDevice(ip, light)       // Starts a portscan on a given ip, if light=true only some highly common used ports are tested
netmap.scanRange(range, light)     // Starts a portscan on a given ip range, if light=true only some highly common used ports are tested
netmap.scanNetwork()               // Start local ip range detection and performs port scans on founded rages
```

The following values are avaible:
    
```javascript
netmap.scannedIps                  // List of scanned IPs
netmap.devices                     // List of found devices
netmap.gateways                    // List of scannable gateways
netmap.ranges                      // List of scannable ranges
netmap.eventEmitter                // EventEmitter of netmap.js
```

The EventEmitter fires on the following signals:

```javascript
netmap.eventEmitter.on("scan-port:start", ({ ip, port }) => {});
netmap.eventEmitter.on("scan-port:end", ({ ip, port, open }) => {});

netmap.eventEmitter.on("scan-device:start", ({ ip }) => {});
netmap.eventEmitter.on("scan-device:end", ({ ip, duration, ports, portsPerSecond }) => {});

netmap.eventEmitter.on("scan-gateways:start", () => {});
netmap.eventEmitter.on("scan-gateways:end", () => {});

netmap.eventEmitter.on("scan-range:start", ({ range, light }) => {});
netmap.eventEmitter.on("scan-range:end", ({ range }) => {});
netmap.eventEmitter.on("add-local-range", ({ range, ip }) => {});
```

The Device class has the following values:

```javascript
const device = new Device();

device.ip                          // Get IP of this device
device.ports                       // Get a Set of reachable ports
device.type                        // DeviceType of this Device
```

The following DeviceType can be detected:

```json
{
    "DEFAULT": { "name": "Default", "ports": [] },
    "WEBSERVICE": { "name": "Webservice", "ports": [80, 443] },
    "SYNOLOGY_NAS": { "name": "Synology NAS", "ports": [5000, 5001] },
    "DATABASE": { "name": "Database", "ports": [3306] },
    "MAIL": { "name": "Mail Server", "ports": [25, 110, 143, 465, 587, 993, 995] },
    "LDAP": { "name": "LDAP Server", "ports": [389, 636] },
    "KERBEROS": { "name": "Kerberos Server", "ports": [88, 464, 543, 544, 749, 750, 751, 752, 753, 754, 760, 1109, 2053, 2105] },
    "AD": { "name": "Active Directory", "ports": [445] }
}
```

Compatiblity
----

This plugin should run in the two latest versions of Chrome, Firefox and Microsoft Edge.


Credits
----
This Project was started by Nico Hauser and Patrice Kast, two Computer Science Students of ETH Zurich, Switzerland.


Contributors
----

All code contributions are greatly appreciated. Just clone the Git repository, read the documentation carefully, go through the code yourself and drop us an message if you want to do an push. All pushes should contain logically improvements.


LICENSE
----

Have a look at the [LICENSE](LICENSE) file.