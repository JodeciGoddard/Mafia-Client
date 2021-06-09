import React from 'react';
import '../../css/Header.css';
import AbilityLabel from '../game-components/AbilityLabel';


const Header = ({ role, events }) => {


    return (
        <div className="header-container">
            <div className="header-section section1">
                <img src={role.image} />
                <p>Team {role.team}</p>
            </div>
            <div className="header-section section2">
                <h4>Your Role</h4>
                <hr />
                <p>{role.desc}</p>
            </div>
            <div className="header-section section3">
                <h4>Abilities</h4>
                <hr />
                {role && role.abilities && role.abilities.map(({ name, desc }, index) => {
                    return (
                        <AbilityLabel
                            name={name}
                            description={desc}
                            key={index}
                        />
                    )
                })}
            </div>
            <div className="header-section section4">
                <h4>Current Events</h4>
                <hr />
                <div className="header-events">
                    {events && events.map((e, index) => {
                        return (
                            <p key={index}>{e.message}</p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Header;