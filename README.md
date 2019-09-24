# netmap.js

A small lightweight network scanner, written in javascript.
netmap.js is an open source penetration testing tool, written in javascript. It tries to scan the local network for open port in different ip ranges and make guesses on the type of device, based on the list of open ports.

Screenshots
----

![Screenshot](https://raw.github.com/wiki/sqlmapproject/sqlmap/images/sqlmap_screenshot.png)

Installation
----

You can download the source files or the compiled file by clicking [here](https://github.com/sqlmapproject/sqlmap/tarball/master).

Preferably, you can download netmap.js by cloning the [Git](https://github.com/sqlmapproject/sqlmap) repository:

    git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev

Usage
----

To use this js plugin, create a new netmap.js object:

	const nmap = new netmal();

The following functions are avaible:

Compatiblity
----

It is compatible with the following browsers: