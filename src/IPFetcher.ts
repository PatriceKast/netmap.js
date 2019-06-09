const IP_REGEX = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;

export const getIps: () => Promise<Set<string>> = () =>
  new Promise((resolve, reject) => {
    const ips: Set<string> = new Set();

    let RTCPeerConnection =
      // @ts-ignore
      window.RTCPeerConnection ||
      // @ts-ignore
      window.mozRTCPeerConnection ||
      // @ts-ignore
      window.webkitRTCPeerConnection;

    if (!RTCPeerConnection) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      //invalidate content script

      // @ts-ignore
      iframe.sandbox = "allow-same-origin";

      //insert into the DOM and get that iframe's webrtc
      document.body.appendChild(iframe);

      const win = iframe.contentWindow;
      RTCPeerConnection =
        // @ts-ignore
        win.RTCPeerConnection ||
        // @ts-ignore
        win.mozRTCPeerConnection ||
        // @ts-ignore
        win.webkitRTCPeerConnection;
    }

    if (!RTCPeerConnection) {
      reject();
    }

    const pc: RTCPeerConnection = new RTCPeerConnection(
      {
        iceServers: [{ urls: "stun:stun.services.mozilla.com" }],
        sdpSemantics: "plan-b" //https://github.com/diafygi/webrtc-ips/issues/44
      },
      { optional: [{ RtpDataChannels: true }] }
    );

    const handleCandidate = (candidate: string) => {
      const ip = IP_REGEX.exec(candidate)[1];
      ips.add(ip);
    };

    pc.onicecandidate = ice => {
      if (ice.candidate) {
        handleCandidate(ice.candidate.candidate);
      }
    };

    pc.createDataChannel("");

    pc.createOffer().then(offer => pc.setLocalDescription(offer));

    setTimeout(() => {
      if (pc.localDescription) {
        const lines = pc.localDescription.sdp.split("\n");
        lines.forEach(line => {
          if (line.indexOf("a=candidate:") === 0) {
            handleCandidate(line);
          }
        });
      }
      resolve(ips);
    }, 1000);
  });
