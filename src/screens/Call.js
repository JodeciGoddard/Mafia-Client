import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import VideoPlayer from '../components/VideoPlayer';
import PeerVideo from '../components/PeerVideo';
import Peer from 'simple-peer';

const Call = ({ socket }) => {

    const [room, setRoom] = useState(null);
    const [game, setGame] = useState(null);
    const [myStream, setMyStream] = useState(null);
    const [usersInThisRoom, SetUsersInThisRoom] = useState(null);
    const [peers, setPeers] = useState([]);

    const userVideo = useRef();

    const peersRef = useRef([]);

    let { id } = useParams();

    useEffect(() => {

        initialiseVideo();

        if (socket) {

            navigator.mediaDevices
                .getUserMedia({ video: { width: 300 }, audio: true })
                .then(stream => {
                    setMyStream(stream);

                    if (userVideo.current) {
                        userVideo.current.srcObject = stream;
                        userVideo.current.muted = true;
                        userVideo.current.play();
                    }

                    if (id) {
                        //request the room info
                        socket.emit('get-game-info', id)
                    } else {
                        console.log("no room id found:", id);
                    }

                    socket.on("sending-game", data => {
                        console.log("game data", data);
                        setGame(data);

                        //get all user in town hall room
                        let townhall;
                        for (let rm of data.rooms) {
                            if (rm.roomName == "town hall") {
                                townhall = rm;
                                break;
                            }
                        }

                        const townhallUsers = [];
                        for (let member of townhall.members) {
                            townhallUsers.push(member.user)
                        }

                        SetUsersInThisRoom(townhallUsers);
                        console.log("Current users: ", townhallUsers);

                        const localPeers = [];
                        townhallUsers.forEach(user => {
                            if (user.userId == socket.id) return;

                            const peer = createPeer(user.userId, socket.id, stream);
                            peersRef.current.push({
                                peerID: user.userId,
                                peer,
                            });
                            localPeers.push(peer);
                        })

                        setPeers(localPeers);

                    })


                    //recieve the room info
                    socket.on('sending-room', data => {
                        setRoom(data);
                        SetUsersInThisRoom(data.users);


                        const localPeers = [];
                        data.users.forEach(user => {
                            if (user.userId == socket.id) return;

                            const peer = createPeer(user.userId, socket.id, stream);
                            peersRef.current.push({
                                peerID: user.userId,
                                peer,
                            });
                            localPeers.push(peer);
                        })

                        setPeers(localPeers);

                    })

                    socket.on("user joined", payload => {
                        const peer = addPeer(payload.signal, payload.callerId, stream);
                        peersRef.current.push({
                            peerID: payload.callerId,
                            peer: peer,
                        })

                        setPeers(peers => [...peers, peer]);

                        // console.log('new array', newPeerArray);

                        console.log('peer joined debug:', peer);
                    })


                    socket.on("receiving returned signal", payload => {
                        const item = peersRef.current.find(p => p.peerID === payload.id);
                        console.log('peer signal recieved: ', item);
                        item.peer.signal(payload.signal);

                    })

                })
                .catch(err => {
                    console.error("error:", err);
                });


        }


    }, []);


    function initialiseVideo() {

    }

    function createPeer(userToSignal, callerId, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", signal => {
            socket.emit("sending signal", { userToSignal, callerId, signal });
        })

        console.log('new peer created: ', peer);

        return peer;
    }

    function addPeer(incomingSignal, callerId, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        })

        console.log("this is the stream:", stream)

        peer.on("signal", signal => {
            socket.emit("returning signal", { signal, callerId })
        });

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <div>
            <div style={{ width: '300px' }}>

                {myStream &&
                    <VideoPlayer videoRef={userVideo} />
                }
            </div>

            {peers && peers.map((peer, index) => {
                return (
                    <div key={index} style={{ width: '300px' }}>
                        <PeerVideo peer={peer} />
                    </div>

                )
            })}

            <p>{peers.length}</p>
        </div>

    );
}

export default Call;