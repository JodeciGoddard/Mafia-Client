import React, { useState } from 'react';
import '../css/Ability.css';

const Ability = ({ players, ability }) => {

    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = e => {
        setSelectedValue(e.target.value);
        // console.log(e.target.value);
    }

    const handleClick = () => {
        console.log(`emit ${ability}`);
    }

    return (
        <div className="ability-container">
            <select name="select" value={selectedValue} onChange={handleChange}>
                <option value="" disabled  >Select Player</option>
                {players && players.map((player, index) => {
                    return (
                        <option key={index} value={player.name}>{player.name}</option>
                    );
                })}

            </select>
            {ability && <button className="ability-button" onClick={handleClick}>{ability}</button>}
        </div>
    );
}

export default Ability;