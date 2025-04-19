import React, { useState, useEffect } from 'react';
import DynamicInput from './DynamicInput';

const Form = () => {
    const formConfig = [
        { type: 'text', label: 'Full Name', name: 'name', required: true },
        { type: 'email', label: 'Email', name: 'email', required: true },
        { type: 'dropdown', label: 'Gender', name: 'gender', options: ['Male', 'Female'], required: true },
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track if form is submitted
    const [touchedFields, setTouchedFields] = useState({}); // Track touched fields

    // Handle form field change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle field touch (onBlur)
    const handleBlur = (e) => {
        setTouchedFields({ ...touchedFields, [e.target.name]: true });
    };

    // Validate the form fields
    const validateForm = () => {
        const newErrors = {};
        formConfig.forEach(field => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required.`;
            }
        });
        setErrors(newErrors);

        // Check if there are any errors to determine form validity
        return Object.keys(newErrors).length === 0;
    };

    // Check form validity on every field change
    useEffect(() => {
        const isValid = validateForm();
        setIsFormValid(isValid);
    }, [formData]); // This runs whenever formData changes

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFormSubmitted(true); // Set submitted flag to true

        if (validateForm()) {
            // Send form data to the server (JSON Server)
            try {
                const response = await fetch('http://localhost:4000/formData', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Form submitted successfully!');
                } else {
                    alert('Error submitting the form.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error submitting the form.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {formConfig.map((field) => (
                <div key={field.name}>
                    <DynamicInput
                        config={field}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur} // Add onBlur to mark the field as touched
                        error={(isFormSubmitted || touchedFields[field.name]) && errors[field.name]} // Only show errors if touched or submitted
                    />
                </div>
            ))}
            <button type="submit" disabled={!isFormValid}>Submit</button>
        </form>
    );
};

export default Form;
