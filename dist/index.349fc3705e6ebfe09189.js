var NetworkScanner=function(s){function e(e){for(var n,t,r=e[0],a=e[1],o=e[2],i=0,c=[];i<r.length;i++)f[t=r[i]]&&c.push(f[t][0]),f[t]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(s[n]=a[n]);for(p&&p(e);c.length;)c.shift()();return l.push.apply(l,o||[]),u()}function u(){for(var e,n=0;n<l.length;n++){for(var t=l[n],r=!0,a=1;a<t.length;a++){0!==f[t[a]]&&(r=!1)}r&&(l.splice(n--,1),e=o(o.s=t[0]))}return e}function o(e){if(t[e])return t[e].exports;var n=t[e]={i:e,l:!1,exports:{}};return s[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}var t={},f={0:0},l=[];o.m=s,o.c=t,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(n,e){if(1&e&&(n=o(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)o.d(t,r,function(e){return n[e]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="";var n=window.webpackJsonpNetworkScanner=window.webpackJsonpNetworkScanner||[],r=n.push.bind(n);n.push=e,n=n.slice();for(var a=0;a<n.length;a++)e(n[a]);var p=r;return l.push([129,1]),u()}({122:function(e){e.exports=[1,3,4,6,7,9,13,17,19,20,21,22,23,24,25,26,30,32,33,37,42,43,49,53,70,79,80,81,82,83,84,85,88,89,90,99,100,106,109,110,111,113,119,125,135,139,143,144,146,161,163,179,199,211,212,222,254,255,256,259,264,280,301,306,311,340,366,389,406,407,416,417,425,427,443,444,445,458,464,465,481,497,500,512,513,514,515,524,541,543,544,545,548,554,555,563,587,593,616,617,625,631,636,646,648,666,667,668,683,687,691,700,705,711,714,720,722,726,749,765,777,783,787,800,801,808,843,873,880,888,898,900,901,902,903,911,912,981,987,990,992,993,995,999,1e3,1001,1002,1007,1009,1010,1011,1021,1022,1023,1024,1025,1026,1027,1028,1029,1030,1031,1032,1033,1034,1035,1036,1037,1038,1039,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050,1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,1061,1062,1063,1064,1065,1066,1067,1068,1069,1070,1071,1072,1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1093,1094,1095,1096,1097,1098,1099,1100,1102,1104,1105,1106,1107,1108,1110,1111,1112,1113,1114,1117,1119,1121,1122,1123,1124,1126,1130,1131,1132,1137,1138,1141,1145,1147,1148,1149,1151,1152,1154,1163,1164,1165,1166,1169,1174,1175,1183,1185,1186,1187,1192,1198,1199,1201,1213,1216,1217,1218,1233,1234,1236,1244,1247,1248,1259,1271,1272,1277,1287,1296,1300,1301,1309,1310,1311,1322,1328,1334,1352,1417,1433,1434,1443,1455,1461,1494,1500,1501,1503,1521,1524,1533,1556,1580,1583,1594,1600,1641,1658,1666,1687,1688,1700,1717,1718,1719,1720,1721,1723,1755,1761,1782,1783,1801,1805,1812,1839,1840,1862,1863,1864,1875,1900,1914,1935,1947,1971,1972,1974,1984,1998,1999,2e3,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2013,2020,2021,2022,2030,2033,2034,2035,2038,2040,2041,2042,2043,2045,2046,2047,2048,2049,2065,2068,2099,2100,2103,2105,2106,2107,2111,2119,2121,2126,2135,2144,2160,2161,2170,2179,2190,2191,2196,2200,2222,2251,2260,2288,2301,2323,2366,2381,2382,2383,2393,2394,2399,2401,2492,2500,2522,2525,2557,2601,2602,2604,2605,2607,2608,2638,2701,2702,2710,2717,2718,2725,2800,2809,2811,2869,2875,2909,2910,2920,2967,2968,2998,3e3,3001,3003,3005,3006,3007,3011,3013,3017,3030,3031,3052,3071,3077,3128,3168,3211,3221,3260,3261,3268,3269,3283,3300,3301,3306,3322,3323,3324,3325,3333,3351,3367,3369,3370,3371,3372,3389,3390,3404,3476,3493,3517,3527,3546,3551,3580,3659,3689,3690,3703,3737,3766,3784,3800,3801,3809,3814,3826,3827,3828,3851,3869,3871,3878,3880,3889,3905,3914,3918,3920,3945,3971,3986,3995,3998,4e3,4001,4002,4003,4004,4005,4006,4045,4111,4125,4126,4129,4224,4242,4279,4321,4343,4443,4444,4445,4446,4449,4550,4567,4662,4848,4899,4900,4998,5e3,5001,5002,5003,5004,5009,5030,5033,5050,5051,5054,5060,5061,5080,5087,5100,5101,5102,5120,5190,5200,5214,5221,5222,5225,5226,5269,5280,5298,5357,5405,5414,5431,5432,5440,5500,5510,5544,5550,5555,5560,5566,5631,5633,5666,5678,5679,5718,5730,5800,5801,5802,5810,5811,5815,5822,5825,5850,5859,5862,5877,5900,5901,5902,5903,5904,5906,5907,5910,5911,5915,5922,5925,5950,5952,5959,5960,5961,5962,5963,5987,5988,5989,5998,5999,6e3,6001,6002,6003,6004,6005,6006,6007,6009,6025,6059,6100,6101,6106,6112,6123,6129,6156,6346,6389,6502,6510,6543,6547,6565,6566,6567,6580,6646,6666,6667,6668,6669,6689,6692,6699,6779,6788,6789,6792,6839,6881,6901,6969,7e3,7001,7002,7004,7007,7019,7025,7070,7100,7103,7106,7200,7201,7402,7435,7443,7496,7512,7625,7627,7676,7741,7777,7778,7800,7911,7920,7921,7937,7938,7999,8e3,8001,8002,8007,8008,8009,8010,8011,8021,8022,8031,8042,8045,8080,8081,8082,8083,8084,8085,8086,8087,8088,8089,8090,8093,8099,8100,8180,8181,8192,8193,8194,8200,8222,8254,8290,8291,8292,8300,8333,8383,8400,8402,8443,8500,8600,8649,8651,8652,8654,8701,8800,8873,8888,8899,8994,9e3,9001,9002,9003,9009,9010,9011,9040,9050,9071,9080,9081,9090,9091,9099,9100,9101,9102,9103,9110,9111,9200,9207,9220,9290,9415,9418,9485,9500,9502,9503,9535,9575,9593,9594,9595,9618,9666,9876,9877,9878,9898,9900,9917,9929,9943,9944,9968,9998,9999,1e4,10001,10002,10003,10004,10009,10010,10012,10024,10025,10082,10180,10215,10243,10566,10616,10617,10621,10626,10628,10629,10778,11110,11111,11967,12e3,12174,12265,12345,13456,13722,13782,13783,14e3,14238,14441,14442,15e3,15002,15003,15004,15660,15742,16e3,16001,16012,16016,16018,16080,16113,16992,16993,17877,17988,18040,18101,18988,19101,19283,19315,19350,19780,19801,19842,2e4,20005,20031,20221,20222,20828,21571,22939,23502,24444,24800,25734,25735,26214,27e3,27352,27353,27355,27356,27715,28201,3e4,30718,30951,31038,31337,32768,32769,32770,32771,32772,32773,32774,32775,32776,32777,32778,32779,32780,32781,32782,32783,32784,32785,33354,33899,34571,34572,34573,35500,38292,40193,40911,41511,42510,44176,44442,44443,44501,45100,48080,49152,49153,49154,49155,49156,49157,49158,49159,49160,49161,49163,49165,49167,49175,49176,49400,49999,5e4,50001,50002,50003,50006,50300,50389,50500,50636,50800,51103,51493,52673,52822,52848,52869,54045,54328,55055,55056,55555,55600,56737,56738,57294,57797,58080,60020,60443,61532,61900,62078,63331,64623,64680,65e3,65129,65389]},123:function(e){e.exports=[66,80,81,443,445,457,1080,1100,1241,1352,1337,1433,1434,1521,1944,2301,3e3,3128,3306,4e3,4001,4002,4100,5e3,5432,5800,5801,5802,6346,6347,7001,7002,8e3,8080,8888,30821]},125:function(e){e.exports=[1,7,9,11,13,15,17,19,20,21,22,23,25,37,42,43,53,77,79,87,95,101,102,103,104,109,110,111,113,115,117,119,123,135,139,143,179,389,427,465,512,513,514,515,526,530,531,532,540,548,556,563,587,601,636,8010,8008,993,995,2049,3659,4045,6e3,6665,6666,6667,6668,6669,6697,65535]},126:function(e){e.exports=[1,7,9,11,13,15,17,19,20,21,22,23,25,37,42,43,53,77,79,87,95,101,102,103,104,109,2,110,3,111,113,115,117,119,123,135,139,143,2,179,389,465,512,513,514,515,526,530,531,532,540,556,563,587,601,636,993,995,3,2049,4045,6e3]},127:function(e){e.exports=[19,21,25,110,119,143,220,993]},128:function(e){e.exports=[1,7,9,11,13,15,17,19,20,21,22,23,25,37,42,43,53,77,79,87,95,101,102,103,104,109,110,111,113,115,117,119,123,135,139,143,179,389,465,512,513,514,515,526,530,531,532,540,556,563,587,601,636,993,995,2049,3659,4045,6e3,6665,6666,6667,6668,6669,6697,65535]},129:function(e,n,t){t(130),e.exports=t(317)},317:function(e,n,t){"use strict";function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function u(e,n,t,r,a,o,i){try{var c=e[o](i),s=c.value}catch(e){return void t(e)}c.done?n(s):Promise.resolve(s).then(r,a)}function a(c){return function(){var e=this,i=arguments;return new Promise(function(n,t){function r(e){u(o,n,t,r,a,"next",e)}function a(e){u(o,n,t,r,a,"throw",e)}var o=c.apply(e,i);r(void 0)})}}function o(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(e){f(n,e,t[e])})}return n}function f(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function p(e,n,t,r,a,o,i){try{var c=e[o](i),s=c.value}catch(e){return void t(e)}c.done?n(s):Promise.resolve(s).then(r,a)}function v(c){return function(){var e=this,i=arguments;return new Promise(function(n,t){function r(e){p(o,n,t,r,a,"next",e)}function a(e){p(o,n,t,r,a,"throw",e)}var o=c.apply(e,i);r(void 0)})}}function d(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}t.r(n);var h=t(124),g=t.n(h),m={Chrome:t(125),Firefox:t(126),Edge:t(127),Safari:t(128),Unsupported:[]},w=t(122),y=t(123),b=/Google/i.test(navigator.vendor)?"Chrome":/Apple/i.test(navigator.vendor)?"Safari":[].toSource?"Firefox":top.msCredentials?"Edge":"Unsupported",x=function(e){var n=0<arguments.length&&void 0!==e?e:b;return new Set(y.filter(function(e){return!m[n].includes(e)}))}(b),S=function(e){var n=0<arguments.length&&void 0!==e?e:b;return new Set(w.filter(function(e){return!m[n].includes(e)}))}(b),k=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return function(e,n,t){n&&r(e.prototype,n),t&&r(e,t)}(e,[{key:"scan",value:function(r,a,e,n){var o=2<arguments.length&&void 0!==e?e:2e3,i=3<arguments.length?n:void 0;return i("scan-port:start",{ip:r,port:a}),new Promise(function(e){function n(){i("scan-port:end",{ip:r,port:a,open:!0}),e(a)}function t(){i("scan-port:end",{ip:r,port:a,open:!1}),e(null)}fetch("http://".concat(r,":").concat(a),{mode:"no-cors"}).then(n).catch(t),setTimeout(function(){var e=new XMLHttpRequest;e.timeout=o,e.ontimeout=t,e.onload=n,e.onerror=function(){fetch("http://".concat(r,":").concat(a),{mode:"no-cors"}).then(n).catch(t),setTimeout(t,10*o)},e.open("GET","http://".concat(r,":").concat(a),!0),e.send()},o)})}}]),e}(),P=function(){function t(e){var o=this,n=e.eventEmitter;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),i(this,"eventEmitter",void 0),i(this,"portScanners",void 0),i(this,"emit",function(e){for(var n,t=arguments.length,r=new Array(1<t?t-1:0),a=1;a<t;a++)r[a-1]=arguments[a];return(n=o.eventEmitter).emit.apply(n,[e].concat(r))}),i(this,"on",function(e,n){return o.eventEmitter.on(e,n)}),i(this,"off",function(e,n){return o.eventEmitter.off(e,n)}),this.eventEmitter=n}var r,n;return function(e,n,t){n&&o(e.prototype,n),t&&o(e,t)}(t,[{key:"scan",value:(n=a(regeneratorRuntime.mark(function e(n){var t,r,a,o,i,c,s,u=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.emit("scan-device:start",{ip:n,light:t=1<u.length&&void 0!==u[1]&&u[1]}),r=Date.now(),a=t?x:S,e.next=6,this.scanPorts(a,n);case 6:return o=e.sent,i=Date.now(),c=Math.round(i-r),s=Math.round(a.length/c*1e3),this.emit("scan-device:end",{ip:n,light:t,startTime:r,endTime:i,duration:c,ports:a,portsPerSecond:s}),e.abrupt("return",o);case 12:case"end":return e.stop()}},e,this)})),function(e){return n.apply(this,arguments)})},{key:"scanPorts",value:(r=a(regeneratorRuntime.mark(function e(n,t){var r,a,o,i=this,c=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=2<c.length&&void 0!==c[2]?c[2]:500,a=new Set,o=s(n);case 3:if(0<o.length)return e.next=6,Promise.all(o.splice(0,10).map(function(e){return(new k).scan(t,e,r,i.emit)}));e.next=10;break;case 6:e.sent.filter(function(e){return null!==e}).forEach(function(e){return a.add(e)}),e.next=3;break;case 10:return e.abrupt("return",a);case 11:case"end":return e.stop()}},e)})),function(e,n){return r.apply(this,arguments)})}]),t}(),E=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/,R=t(60),O={};for(var T in R)O[T]=c({},R[T],{ports:new Set(R[T].ports)});function C(e,n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,C),l(this,"ip",void 0),l(this,"ports",void 0),l(this,"type",void 0),this.ip=e,this.ports=n,this.type=C.getType(e,n)}var D=O;l(C,"getType",function(e,n){var t=0,r="DEFAULT";for(var a in D){var o=D[a],i=0;void 0!==o.ipsuffix&&e.substring(e.length-o.ipsuffix.length,e.length)===o.ipsuffix&&(i+=10);var c=!0,s=!1,u=void 0;try{for(var f,l=o.ports[Symbol.iterator]();!(c=(f=l.next()).done);c=!0){n.has(f.value)?i+=1:i-=1}}catch(e){s=!0,u=e}finally{try{c||null==l.return||l.return()}finally{if(s)throw u}}var p=!0,v=!1,d=void 0;try{for(var h,g=n[Symbol.iterator]();!(p=(h=g.next()).done);p=!0){o.ports.has(h.value)||(i-=1)}}catch(e){v=!0,d=e}finally{try{p||null==g.return||g.return()}finally{if(v)throw d}}t<i&&(t=i,r=a)}return D[r]});var j=C;n.default=function e(n){var p=this,t=n.log,r=void 0===t?console.log:t,a=n.gateways,o=void 0===a?[]:a,i=n.ranges,c=void 0===i?[]:i;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),d(this,"log",void 0),d(this,"portScanManager",void 0),d(this,"gateways",void 0),d(this,"ranges",void 0),d(this,"scannedIps",new Set),d(this,"ipToPorts",{}),d(this,"devices",new Set),d(this,"eventEmitter",void 0),d(this,"emit",function(e){for(var n,t=arguments.length,r=new Array(1<t?t-1:0),a=1;a<t;a++)r[a-1]=arguments[a];return(n=p.eventEmitter).emit.apply(n,[e].concat(r))}),d(this,"on",function(e,n){return p.eventEmitter.on(e,n)}),d(this,"off",function(e,n){return p.eventEmitter.off(e,n)}),d(this,"scanDevice",function(){var n=v(regeneratorRuntime.mark(function e(a){var o,i,c,s=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=!(1<s.length&&void 0!==s[1])||s[1],e.next=3,p.portScanManager.scan(a,o);case 3:return i=e.sent,p.scannedIps.add(a),n=p.ipToPorts,t=a,(r=i)&&(n[t]?r.forEach(n[t].add):n[t]=new Set(r)),0<i.size&&(c=new j(a,i),p.devices.add(c),p.emit("add-device",c)),e.abrupt("return",i);case 8:case"end":return e.stop()}var n,t,r},e)}));return function(e){return n.apply(this,arguments)}}()),d(this,"scanRange",function(){var n=v(regeneratorRuntime.mark(function e(n){var t,r,a,o=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:p.emit("scan-range:start",{range:n,light:t=!(1<o.length&&void 0!==o[1])||o[1]}),r=0;case 3:if(!(r<255)){e.next=11;break}if(p.scannedIps.has(a=n+r)){e.next=8;break}return e.next=8,p.scanDevice(a,t);case 8:r++,e.next=3;break;case 11:p.emit("scan-range:end",{range:n,light:t,scannedIps:p.scannedIps});case 12:case"end":return e.stop()}},e)}));return function(e){return n.apply(this,arguments)}}()),d(this,"testGateways",v(regeneratorRuntime.mark(function e(){var n,t,r,a,o,i,c,s=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:p.emit("scan-gateways:start",{light:n=!(0<s.length&&void 0!==s[0])||s[0],gateways:p.gateways}),r=!(t=!0),a=void 0,e.prev=5,o=p.gateways[Symbol.iterator]();case 7:if(t=(i=o.next()).done){e.next=14;break}return c=i.value,e.next=11,p.scanDevice(c,n);case 11:t=!0,e.next=7;break;case 14:e.next=20;break;case 16:e.prev=16,e.t0=e.catch(5),r=!0,a=e.t0;case 20:e.prev=20,e.prev=21,t||null==o.return||o.return();case 23:if(e.prev=23,r)throw a;e.next=26;break;case 26:return e.finish(23);case 27:return e.finish(20);case 28:p.emit("scan-gateways:end",{light:n,gateway:p.gateways});case 29:case"end":return e.stop()}},e,null,[[5,16,20,28],[21,,23,27]])}))),d(this,"addLocalRanges",v(regeneratorRuntime.mark(function e(){var t,r,a,o,i,c,s,u,f;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return p.emit("get-local-ips:start"),e.next=3,new Promise(function(e,n){function t(e){var n=E.exec(e)[1];r.add(n)}var r=new Set,a=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;if(!a){var o=document.createElement("iframe");o.style.display="none",o.sandbox="allow-same-origin",document.body.appendChild(o);var i=o.contentWindow;a=i.RTCPeerConnection||i.mozRTCPeerConnection||i.webkitRTCPeerConnection}a||n();var c=new a({iceServers:[{urls:"stun:stun.services.mozilla.com"}],sdpSemantics:"plan-b"},{optional:[{RtpDataChannels:!0}]});c.onicecandidate=function(e){e.candidate&&t(e.candidate.candidate)},c.createDataChannel(""),c.createOffer().then(function(e){return c.setLocalDescription(e)}),setTimeout(function(){c.localDescription&&c.localDescription.sdp.split("\n").forEach(function(e){0===e.indexOf("a=candidate:")&&t(e)}),e(r)},1e3)});case 3:for(p.emit("get-local-ips:end",{ips:t=e.sent}),p.emit("add-local-ranges:start"),r=new Set,o=!(a=!0),i=void 0,e.prev=10,c=t[Symbol.iterator]();!(a=(s=c.next()).done);a=!0)f=(n=u=s.value).substring(0,n.lastIndexOf("."))+".",p.emit("add-local-range",{range:f,ip:u}),r.add(f),p.gateways.add(f+"1");e.next=18;break;case 14:e.prev=14,e.t0=e.catch(10),o=!0,i=e.t0;case 18:e.prev=18,e.prev=19,a||null==c.return||c.return();case 21:if(e.prev=21,o)throw i;e.next=24;break;case 24:return e.finish(21);case 25:return e.finish(18);case 26:r.forEach(function(e){return p.ranges.add(e)}),p.emit("add-local-ranges:end",{localRanges:r});case 28:case"end":return e.stop()}var n},e,null,[[10,14,18,26],[19,,21,25]])}))),d(this,"scanNetwork",v(regeneratorRuntime.mark(function e(){var n,t,r,a,o,i,c,s,u,f,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.addLocalRanges();case 2:return e.next=4,p.testGateways(!0);case 4:t=!(n=!0),r=void 0,e.prev=7,a=p.ranges[Symbol.iterator]();case 9:if(n=(o=a.next()).done){e.next=16;break}return i=o.value,e.next=13,p.scanRange(i,!0);case 13:n=!0,e.next=9;break;case 16:e.next=22;break;case 18:e.prev=18,e.t0=e.catch(7),t=!0,r=e.t0;case 22:e.prev=22,e.prev=23,n||null==a.return||a.return();case 25:if(e.prev=25,t)throw r;e.next=28;break;case 28:return e.finish(25);case 29:return e.finish(22);case 30:s=!(c=!0),u=void 0,e.prev=33,f=p.ranges[Symbol.iterator]();case 35:if(c=(l=f.next()).done){e.next=42;break}return p.scanRange(l.value,!(e.next=39));case 39:c=!0,e.next=35;break;case 42:e.next=48;break;case 44:e.prev=44,e.t1=e.catch(33),s=!0,u=e.t1;case 48:e.prev=48,e.prev=49,c||null==f.return||f.return();case 51:if(e.prev=51,s)throw u;e.next=54;break;case 54:return e.finish(51);case 55:return e.finish(48);case 56:case"end":return e.stop()}},e,null,[[7,18,22,30],[23,,25,29],[33,44,48,56],[49,,51,55]])}))),this.log=r,this.gateways=new Set(o),this.ranges=new Set(c),this.eventEmitter=new g.a,this.portScanManager=new P({eventEmitter:this.eventEmitter}),this.log&&(this.on("scan-device:start",function(e){return p.log("device","Scanning ip ".concat(e.ip))}),this.on("scan-device:end",function(e){var n=e.duration,t=e.ports,r=e.portsPerSecond;return p.log("device","Done scanning ".concat(e.ip,". It took ").concat(n," ms for scanning ").concat(t.length," ports, ").concat(r," Ports / Sec"))}),this.on("scan-range:start",function(e){var n=e.light;return p.log("info","Scanning range ".concat(e.range,", light: ").concat(n))}),this.on("scan-range:end",function(e){return p.log("info","Done scanning range ".concat(e.range))}),this.on("add-local-range",function(e){var n=e.ip;return p.log("info","Added local range ".concat(e.range," (via ").concat(n,")"))}),this.on("scan-gateways:start",function(){return p.log("info","Testing gateways...")}),this.on("scan-gateways:end",function(){return p.log("info","Done testing gateways...")}),this.on("scan-port:start",function(e){var n=e.port;return p.log("ports","Check Port //".concat(e.ip,":").concat(n))}),this.on("scan-port:end",function(e){var n=e.port,t=e.open;t&&p.log("ports","Open Port: //".concat(e.ip,":").concat(n,", ").concat(t))}))}},60:function(e){e.exports={DEFAULT:{name:"Default",ports:[]},ROUTER:{name:"Router",ipsuffix:"1",ports:[80,443]},SYNOLOGY_NAS:{name:"Synology NAS",ports:[5e3,5001]},DATABASE:{name:"Database",ports:[3306]},MAIL:{name:"Mail Server",ports:[25,110,143,465,587,993,995]},LDAP:{name:"LDAP Server",ports:[389,636]},KERBEROS:{name:"Kerberos Server",ports:[88,464,543,544,749,750,751,752,753,754,760,1109,2053,2105]},AD:{name:"Active Directory",ports:[445]}}}}).default;