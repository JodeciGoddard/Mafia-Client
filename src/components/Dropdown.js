import React from 'react';
import '../css/Dropdown.css';

const Dropdown = ({ title, value, onChange, options }) => {

    const handleChange = e => {
        onChange(e.target.value);
        // console.log(e.target.value);
    }

    return (
        <div className="dropdown-container">
            <label htmlFor={title}>{title}</label>
            <select name={title} value={value} onChange={handleChange}>
                <option value="" disabled  >Select Player</option>
                {options && options.map((op, index) => {
                    return (
                        <option key={index} value={op.name}>
                            {op.name}
                        </option>
                    )
                })}
            </select>
        </div>
    );
}

export default Dropdown;