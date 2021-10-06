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
    const [games, setGames] = useState([]);

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

            socket.on('room-created', data => {
                console.log("room created: ", data);
                socket.emit('join-room', data.id, uname.current.value);
            });

            socket.on('enter-room', data => {
                setRoomData(data);
                setUser({
                    id: socket.id,
                    name: uname.current.value,
                })
                history.push('/game/' + data.id);
            })

            socket.on('new-room-created', () => {
                getRooms().then(data => {
                    setGames(data);
                })
            })
        }

        getRooms().then(data => {
            setGames(data);
        })

    }, []);



    const handleCreate = e => {
        e.preventDefault();
        if (username.trim() === '') {
            setMessage("Please enter a username");
            return;
        };
        socket.emit("createRoom", { username: username });

    }

    const handleJoin = e => {
        e.preventDefault();
        if (username.trim() === '') {
            setMessage("Please enter a username");
            return;
        };
        if (roomId.trim() === '') {
            setMessage("Please enter a Room Id");
            return;
        };

        socket.emit('join-room', roomId, username);

        console.log('join clicked: ' + roomId, username);
    }

    const handleGameSelect = g => {
        setRoomId(g.id);
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
                                {games.map((game, index) => {
                                    return (
                                        <tr key={index} onClick={(e) => handleGameSelect(game)}>
                                            <td>
                                                {game.host}
                                            </td>
                                            <td>
                                                {game.id}
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