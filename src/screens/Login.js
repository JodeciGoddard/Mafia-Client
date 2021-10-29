import React, { useState } from 'react';
import { useHistory } from 'react-router';
import '../css/Login.css';


const Login = () => {

    const [username, setUsername] = useState('');

    let history = useHistory();

    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const next = () => {
        if (username.trim() == "") return;
        history.push('/join/' + username);
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <label htmlFor="username">Username</label>
                <input type="text" onChange={updateUsername} />
                <button onClick={next}>Next</button>
            </div>

        </div>
    );
}

export default Login;