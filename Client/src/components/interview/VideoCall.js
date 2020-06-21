import React, { useEffect, useState, useRef } from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";


const VideoCall = () => {
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [calling, setCalling] = useState(false);


    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

    useEffect(() => {
        const socketUrl = "http://localhost:5000";
        socket.current = io(socketUrl);
        socket.current.on('connect', () => {
            console.log("Connected");
        });

        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: true
            }).then(stream => {
                setStream(stream);
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            })
        }

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
            setCalling(false);
            console.log("Disconnecting");
        });

    }, []);

    function callPeer(){
        console.log("Calling");
        setCalling(true);
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
            setCalling(false);
            peer.signal(signal);
        });

    }

    function acceptCall(){
        console.log("Call Accepted");
        setCallAccepted(true);
        setReceivingCall(false);
        setCalling(false);
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
    let UserVideoStyle = {
        zIndex: 2,
        position: 'absolute',
        maxWidth: '99%',
        maxHeight: '99%',
        width: '10vw',
        height: '10vw',
        backgroundSize: 'cover',
        overflow: 'hidden',
    }
    if (stream) {
        UserVideo = (
            <div className="wrapper">
                <video style={UserVideoStyle} playsInline muted ref={userVideo} autoPlay></video>
            </div>
        );
    }

    let PartnerVideo;
    let PartnerVideoStyle={
        zIndex: 1,
        position: 'absolute',
        maxWidth: '99%',
        maxHeight: '99%',
        width: '60vw',
        height: '60vw',
        backgroundSize: 'cover',
        overflow: 'hidden',
    }
    if (callAccepted) {
        PartnerVideo = (
            <div className="wrapper">
                <video style={PartnerVideoStyle} playsInline ref={partnerVideo} autoPlay width="65%" height="65%" object-fit="cover" ></video>
            </div>
        );
    }

    let bottom;
    let bottomStyle = {
        position: 'absolute',
        bottom: '0.5vh',
        height: '10%',
        width: '100%',
        zIndex:3
    }
    if (!receivingCall && !callAccepted && !calling) {
        bottom = (
            <div style={bottomStyle}>
                <button onClick={() => callPeer()}>Call</button>
            </div>
        );
    }
    else if (calling) {
        bottom = (
            <div style={bottomStyle}>
                <button onClick={() => disconnectCall()}>Cancel Calling</button>
            </div>
        );
    }
    else if(!callAccepted){
        bottom = (
            <div style={bottomStyle}>
                <button onClick={() => acceptCall()}>Answer</button>
            </div>
        );
    }
    else{
        bottom = (
            <div style={bottomStyle}>
                <button onClick={() => disconnectCall()}>Disconnect</button>
            </div>
        );
    }

    return (
        <div>
            {/* <Container fluid className="main-content-container px-4"> */}
                {UserVideo}
                {PartnerVideo}
                {bottom}
            {/* </Container> */}
        </div>
    );
};

export default VideoCall;