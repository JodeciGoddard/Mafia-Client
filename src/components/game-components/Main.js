import React, { useState } from 'react';
import '../../css/Main.css';
import Ability from '../Ability';
import RadioGroup from '../game-components/RadioGroup';
import Dropdown from '../Dropdown';

const Main = ({ role, players }) => {
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedFormal, setSelectedFormal] = useState("");
    const [selectedChopping, setSelectedChopping] = useState("");

    const handleVote = () => {
        console.log(`emit time: ${selectedTime}, formal: ${selectedFormal} Chop: ${selectedChopping}`);
    }

    return (
        <div className="main-container">
            <div className="main-section ability-section">
                <h4>Day Abilities</h4>
                <hr />
                {role && role.abilities && role.abilities.map((ab, index) => {
                    if (ab.type === 'day') {
                        return (
                            <Ability
                                players={players}
                                ability={ab.name}
                                key={index}
                            />
                        );
                    }
                })}

                {role && role.abilities && role.abilities.length === 0 ? <p>You have no abilities</p> : null}

                <h4>Night Abilities</h4>
                <hr />
                {role && role.abilities && role.abilities.map((ab, index) => {
                    if (ab.type === 'night') {
                        return (
                            <Ability
                                players={players}
                                ability={ab.name}
                                key={index}
                            />
                        );
                    }
                })}
                {role && role.abilities && role.abilities.length === 0 ? <p>You have no abilities</p> : null}
            </div>
            <div className="main-section screen-section">

                <div className="main-screen">
                    <div className="main-screen-content">
                        screen
                    </div>
                </div>

            </div>
            <div className="main-section voting-section">
                <h4>Voting</h4>
                <hr />
                <RadioGroup
                    options={["Extended Time", "Go To Night"]}
                    value={selectedTime}
                    onChange={setSelectedTime}
                />
                <Dropdown
                    title="Formal"
                    options={players}
                    onChange={(value) => setSelectedFormal(value)}
                    value={selectedFormal}
                />

                <Dropdown
                    title="Chopping Block"
                    options={players}
                    onChange={(value) => setSelectedChopping(value)}
                    value={selectedChopping}
                />

                <button onClick={handleVote}>
                    Vote
                </button>
            </div>
        </div>
    );
}

export default Main;