import React, { useState } from 'react';
import '../../css/RadioGroup.css';

const RadioGroup = ({ value, options, onChange }) => {
    return (



        <div className="radio-container">

            {options && options.map((option, index) => {
                return (
                    <div className="radio-option" key={index} onClick={() => onChange(option)}>
                        <p>{option}:</p>
                        <div className="radio-item">
                            <div className={value === option ? "radio-selected" : "radio-selected invisible"}></div>
                        </div>
                    </div>
                )
            })}

        </div>
    );
}

export default RadioGroup;