import { io } from 'socket.io-client';


let mainSocket = io('http://localhost:5000');

export default mainSocket;