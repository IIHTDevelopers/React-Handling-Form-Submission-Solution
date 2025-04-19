import React from 'react';

const DynamicInput = ({ config, value, onChange }) => {
    switch (config.type) {
        case 'text':
        case 'email':
            return (
                <div>
                    <label>{config.label}</label>
                    <input
                        type={config.type}
                        name={config.name}
                        value={value}
                        onChange={onChange}
                        required={config.required}
                    />
                </div>
            );
        case 'dropdown':
            return (
                <div>
                    <label>{config.label}</label>
                    <select
                        name={config.name}
                        value={value}
                        onChange={onChange}
                        required={config.required}
                    >
                        <option value="">Select...</option>
                        {config.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            );
        default:
            return null;
    }
};

export default DynamicInput;
