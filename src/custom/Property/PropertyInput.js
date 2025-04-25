import React from 'react';

export default function PropertyInput({ label, value, onChange, ...props }) {
    const handleChange = (e) => {
        console.log(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="property-control">
            <label>{label}</label>
            <input
                type="text"
                value={value || ''}
                onChange={handleChange}
                {...props}
            />
        </div>
    );
}