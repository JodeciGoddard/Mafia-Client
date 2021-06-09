import axios from 'axios';


export async function getRooms() {
    const host = 'http://localhost:5000';
    let res = await axios.get(host + "/getGames");
    // console.log("axios: ", res);
    return res.data;
}