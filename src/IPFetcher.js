export const getIp = () =>
  new Promise((resolve, reject) => {
    const ip_dups = {};
    const RTCPeerConnection =
      window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection;

    const useWebKit = !!window.webkitRTCPeerConnection;

    if (!RTCPeerConnection) {
      const win = document.querySelector(".iframe_webrtc").contentWindow;
      RTCPeerConnection =
        win.RTCPeerConnection ||
        win.mozRTCPeerConnection ||
        win.webkitRTCPeerConnection;
      useWebKit = !!win.webkitRTCPeerConnection;
    }

    if (!RTCPeerConnection) {
      reject();
      resolve(null);
    }

    const pc = new RTCPeerConnection(
      { iceServers: [{ urls: "stun:stun.services.mozilla.com" }] },
      { optional: [{ RtpDataChannels: true }] }
    );

    const checkForIPString = candidate => {
      const ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
      const ip_addr = ip_regex.exec(candidate)[1];

      if (ip_dups[ip_addr] === undefined) {
        resolve(ip_addr);
      }

      ip_dups[ip_addr] = true;
    };

    pc.onicecandidate = ice => {
      if (ice.candidate) checkForIPString(ice.candidate.candidate);
    };

    pc.createDataChannel("");

    pc.createOffer(
      result => {
        pc.setLocalDescription(result, () => {}, () => {});
      },
      () => {}
    );

    setTimeout(() => {
      if (pc.localDescription != null) {
        const lines = pc.localDescription.sdp.split("\n");
        lines.forEach(line => {
          if (line.indexOf("a=candidate:") === 0) {
            checkForIPString(line);
          }
        });
      }
      resolve(null);
    }, 1000);
  });
