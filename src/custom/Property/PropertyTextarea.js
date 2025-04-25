import React from 'react';

export default function PropertyTextarea({ label, value, onChange, ...props }) {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className="property-control">
            <label>{label}</label>
            <textarea
                value={value || ''}
                onChange={handleChange}
                rows={3}
                {...props}
            />
        </div>
    );
}