import React, { useState, useEffect, useRef } from 'react';
import '../css/Join.css';
import { useHistory } from 'react-router-dom';
import { getRooms } from '../util/fetch';
import { roomData, me } from '../State';
import { useSetRecoilState } from 'recoil';

const Join = ({ socket }) => {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [message, setMessage] = useState("");
    const [games, setGames] = useState({});

    //refs
    const uname = useRef();

    const setRoomData = useSetRecoilState(roomData);
    const setUser = useSetRecoilState(me);

    let history = useHistory();

    const update = (e) => {
        if (e.target.id === 'username') {
            setUsername(e.target.value);
        }
        if (e.target.id === 'roomId') {
            setRoomId(e.target.value);
        }
    }

    useEffect(() => {

        if (socket) {

            //request the rooms when components loads
            socket.emit("get-rooms");

            //list of rooms sent to this client
            socket.on('sending-rooms', data => {
                setGames(data)
            })

            //global notification new room was created
            socket.on('room-created', data => {
                setGames(data)
                console.log("new room created", data);
            })

            //notification on the room this client created
            socket.on('you-created-a-room', id => {
                console.log("you created a new room: ", id)
                if (uname.current.value !== "") {
                    socket.emit('join-room', { roomId: id, username: uname.current.value })
                    history.push('/game/' + id);
                }

            })



        }

    }, []);




    const handleCreate = e => {
        e.preventDefault();
        if (username.trim() !== '') {
            socket.emit('create-room', { hostname: username });
        } else {
            setMessage("Please enter a username");
        }
    }

    const handleJoin = e => {
        e.preventDefault();
        socket.emit('join-room', { roomId: roomId, username: username })
        history.push('/game/' + roomId);
    }

    const handleGameSelect = id => {
        setRoomId(id);
    }

    return (
        <div className="join-container">

            <form>
                <label htmlFor="username">User Name</label>
                <input id="username" ref={uname} name="username" type="text" value={username} onChange={update} autoComplete='off' />
                <button onClick={handleCreate}>Create Room</button>
                <label htmlFor="username">Room Id</label>
                <input id="roomId" name="roomId" type="text" value={roomId} onChange={update} autoComplete='off' />
                <button onClick={handleJoin}>Join Room</button>

                <div className="join-rooms">
                    <h4>Available Games</h4>
                    <hr />
                    <div className="join-gamelist" >
                        <table>
                            <thead>
                                <tr>
                                    <th>Host</th>
                                    <th>Game ID</th>
                                </tr>

                            </thead>
                            <tbody>
                                {games && Object.keys(games).map((id, index) => {
                                    return (
                                        <tr key={index} onClick={(e) => handleGameSelect(id)}>
                                            <td>
                                                {games[id].host}
                                            </td>
                                            <td>
                                                {id}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>

                <p className="join-error">{message}</p>
            </form>


            <p>{socket && socket.id ? "connected" : "waiting for connection"}</p>
        </div>

    );
}

export default Join;