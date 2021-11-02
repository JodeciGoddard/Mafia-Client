import React, { useState, useEffect, useRef } from 'react';
import '../css/Join.css';
import { useHistory, useParams } from 'react-router-dom';
import Lobby from '../components/Lobby';

const Join = ({ socket }) => {
    const [roomName, setRoomName] = useState("");
    const [lobbyId, setLobbyId] = useState("");
    const [message, setMessage] = useState("");
    const [games, setGames] = useState({});

    const [inLobby, setInLobby] = useState(false);
    const [lobbyData, setLobbyData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    let history = useHistory();

    let { username } = useParams();

    const update = (e) => {
        if (e.target.id === 'roomName') {
            setRoomName(e.target.value);
        }
        if (e.target.id === 'lobbyId') {
            setLobbyId(e.target.value);
        }
    }

    useEffect(() => {

        if (socket) {

            //request the rooms when components loads
            socket.emit("get-lobbies");

            //list of rooms sent to this client
            socket.on('sending-lobbies', data => {
                setGames(data)
                console.log('games: ', data);
            })

            //global notification new room was created
            socket.on('lobby-created', data => {
                setGames(data)
                console.log("new room created", data);
            })

            //notification on the room this client created
            socket.on('you-created-a-room', id => {
                console.log("you created a new room: ", id)
                if (username !== "") {
                    socket.emit('join-room', { roomId: id, username: username })
                    history.push('/game/' + id);
                }

            })

            socket.on('lobbies-updated', data => {
                setGames(data);
            })

            socket.on('you-joined-lobby', data => {
                setLobbyData(data);
                setInLobby(true);
            });


        }

    }, []);

    useEffect(() => {
        if (inLobby) {
            const lobby = games[lobbyData.lobbyId];

            if (lobby !== null) {
                // setLobbyData(lobby);
                if (lobby.hostname == username) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            }
        }
    }, [inLobby])

    useEffect(() => {
        if (inLobby) {
            if (lobbyData.lobbyId) {
                setLobbyData(games[lobbyData.lobbyId]);
            }
        }
    }, [games]);




    const handleCreate = e => {
        e.preventDefault();
        if (username.trim() !== '') {
            socket.emit('create-lobby', { username: username, roomName: roomName });
        } else {
            setMessage("Please enter a username");
        }
    }

    const handleJoin = e => {
        e.preventDefault();
        socket.emit('join-lobby', { lobbyId: lobbyId, username: username });
    }

    const handleGameSelect = id => {
        setLobbyId(id);
    }

    const removeFromLobby = () => {
        socket.emit('remove-from-lobby', lobbyId);
        setInLobby(false);
        setLobbyData({});
    }

    const startGame = () => {
        socket.emit('start-game', lobbyId);
    }

    return (
        <div className="join-container">

            <Lobby startGame={startGame} isAdmin={isAdmin} leave={removeFromLobby} lobby={lobbyData} isVisible={inLobby} />

            <form>
                <label htmlFor="">Room Name</label>
                <input id="roomName" type="text" value={roomName} onChange={update} autoComplete='off' />
                <button onClick={handleCreate}>Create Room</button>
                <label htmlFor="">Lobby Id</label>
                <input id="lobbyId" name="lobbyId" type="text" value={lobbyId} onChange={update} autoComplete='off' />
                <button onClick={handleJoin}>Join Room</button>

                <div className="join-rooms">
                    <h4>Available Games</h4>
                    <hr />
                    <div className="join-gamelist" >
                        <table>
                            <thead>
                                <tr>
                                    <th>Host</th>
                                    <th>Lobby Name</th>
                                    <th>Game ID</th>
                                </tr>

                            </thead>
                            <tbody>
                                {games && Object.keys(games).map((id, index) => {
                                    return (
                                        <tr key={index} onClick={(e) => handleGameSelect(id)}>
                                            <td>
                                                {games[id].hostname}
                                            </td>
                                            <td>
                                                {games[id].lobbyName}
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