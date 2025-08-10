import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface JitsiMeetProps {
  room: string;
  token: string;
  domain?: string;
  userName?: string;
}

const JitsiMeet: React.FC<JitsiMeetProps> = ({ room, token, domain = "meet.jit.si", userName }) => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.JitsiMeetExternalAPI) {
      const api = new window.JitsiMeetExternalAPI(domain, {
        roomName: room,
        parentNode: jitsiContainerRef.current,
        jwt: token,
        userInfo: { displayName: userName || "Guest" },
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: true,
          disableInviteFunctions: true,
          enableEncryption: true,
        },
        interfaceConfigOverwrite: {
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        },
      });
      return () => api.dispose();
    }
  }, [room, token, domain, userName]);

  return <div ref={jitsiContainerRef} style={{ height: "600px", width: "100%" }} />;
};

export default JitsiMeet;
