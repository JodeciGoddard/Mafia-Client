import React from 'react';
import '../../css/AbilityLabel.css';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const AbilityLabel = ({ name, description }) => {
    return (
        <div className="al-container">
            <p>{name}</p>
            <div className="al-info">
                <AiOutlineInfoCircle />
                <p >{description}</p>
            </div>
        </div>
    );
}

export default AbilityLabel;