import React, { useEffect, useState, useRef } from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";

const Container = {
  height: '50vh',
  width: '50vw',
  position: 'absolute',
  border: '1px solid blue',
}

const UserStyle = {
  width: '10%   !important',
  height: 'auto   !important',
  position: 'relative'
}

const ClientStyle = {
    width: '100%    !important',
    height: 'auto   !important',
    position: 'relative'
}

function VideoCall() {
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);


    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

    useEffect(() => {
        const socketUrl = "http://192.168.43.253:5000";
        socket.current = io(socketUrl);
        socket.current.on('connect', () => {
            console.log("Connected");
        });

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })

        socket.current.on("connected", () => {
            socket.current.emit('join', "XYZ", function (response) {
                console.log(response);
            });
            console.log("Connected with backend");
        });

        socket.current.on("hey", (data) => {
            console.log("SOMEONE CALLING");
            setReceivingCall(true);
            setCallerSignal(data.signal);
        });

        socket.current.on("disconnect", () => {
            setReceivingCall(false);
            setCallAccepted(false);
            console.log("Disconnecting");
        });

    }, []);

    function callPeer(){
        console.log("Calling");
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", data => {
            socket.current.emit("callUser", { room: "XYZ", signal: data})
        });

        peer.on("stream", stream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.current.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        });

    }

    function acceptCall(){
        console.log("Call Accepted");
        setCallAccepted(true);
        setReceivingCall(false);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", data => {
            socket.current.emit("acceptCall", { room: "XYZ", signal: data})
        })

        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
    }

    
    function disconnectCall(){
        socket.current.emit("disconnectCall", { room: "XYZ" })
    }

    let UserVideo;
    if (stream) {
        UserVideo = (
            <div style={UserStyle}>
                <video playsInline muted ref={userVideo} autoPlay ></video>
            </div>
        );
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = (
            <div style={ClientStyle}>
                <video playsInline ref={partnerVideo} autoPlay ></video>
            </div>
        );
    }

    let bottom;
    if (!receivingCall && !callAccepted) {
        bottom = (<button onClick={() => callPeer()}>Call</button>);
    }
    else if(!callAccepted){
        bottom = (<button onClick={() => acceptCall()}>Answer</button>);
    }
    else{
        bottom = (<button onClick={() => disconnectCall()}>Disconnect</button>);
    }

    return (
        <div className="container" style={Container}>
            {UserVideo}
            {PartnerVideo}
            {bottom}
        </div>
    );
}

export default VideoCall;