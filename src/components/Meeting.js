import React, { useEffect, Fragment } from 'react';
import {useLocation} from 'react-router-dom';

const Meeting = () => {
const location = useLocation();
console.log(location.state);
const payload = {
meetingNumber:location.state.livesession.roomNumber,

 role:0,
sdkKey:'zzIx6B10RsSh4oSvxZ9B3Q',
sdkSecret:'CSG3lLgcpPtJtDDTauo15zCFHPLabSs5',
passWord: location.state.livesession.passWord,

 userName: location.state.userData.name,
userEmail: location.state.userData.email,
leaveUrl: "https://cramix.vercel.app/dashboard",
};

useEffect(() => {
const initializeMeeting = async () => {
try {
const { ZoomMtg } = await import("@zoomus/websdk");

    await ZoomMtg.setZoomJSLib('https://source.zoom.us/2.17.0/lib', '/av');
    await ZoomMtg.preLoadWasm();
    await ZoomMtg.prepareWebSDK();
    // loads language files, also passes any error messages to the ui
    // ZoomMtg.i18n.load('en-US');
    // ZoomMtg.i18n.reload('en-US');
    ZoomMtg.generateSDKSignature({
      meetingNumber: payload.meetingNumber,
      role: payload.role,
      sdkKey: payload.sdkKey,
      sdkSecret: payload.sdkSecret,
      success: function (signature) {
        ZoomMtg.init({
          leaveUrl: payload.leaveUrl,
          success: function (data) {
            ZoomMtg.join({
              meetingNumber: payload.meetingNumber,
              signature: signature.result,
              sdkKey: payload.sdkKey,
              userName: payload.userName,
              userEmail: payload.userEmail,
              passWord: payload.passWord,
              tk: "",
              success: function () {
                console.log("-- joined --");
              },
              error: function (joinError) {
                console.error("Error joining meeting:", joinError);
              },
            });
          },
          error: function (initError) {
            console.error("Error initializing Zoom:", initError);
          },
        });
      },
      error: function (signError) {
        console.error("Error generating SDK signature:", signError);
      },
    });
  } catch (error) {
    console.error("Error while initializing Zoom:", error);
  }
};

initializeMeeting();
}, [payload.meetingNumber, payload.role, payload.sdkKey, payload.sdkSecret, payload.passWord, payload.userName, payload.userEmail, payload.leaveUrl]);

return (
<Fragment>
<link type='text/css' rel='stylesheet' href='https://source.zoom.us/2.17.0/css/bootstrap.css'></link>
<link type='text/css' rel='stylesheet' href='https://source.zoom.us/2.17.0/css/react-select.css'></link>
</Fragment>
);
};

export default Meeting;