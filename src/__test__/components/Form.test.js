import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../../components/Form';
import DynamicInput from '../../components/DynamicInput';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../components/DynamicInput', () => ({ config, value, onChange, onBlur, error }) => (
    <div data-testid={config.name}>
        <label htmlFor={config.name}>{config.label}</label>
        <input
            type={config.type === 'dropdown' ? 'text' : config.type} // Use 'text' for the dropdown mock
            name={config.name}
            id={config.name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-label={config.label}
            aria-invalid={error ? 'true' : 'false'}
        />
        {error && <span>{error}</span>}
    </div>
));

describe('boundary', () => {
    test('FormComponent boundary renders the form with all fields', () => {
        render(<Form />);

        expect(screen.getByText('Full Name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Gender')).toBeInTheDocument();
    });

    test('FormComponent boundary shows validation error messages on submit for required fields', () => {
        render(<Form />);

        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        expect(screen.getByText('Full Name is required.')).toBeInTheDocument();
        expect(screen.getByText('Email is required.')).toBeInTheDocument();
        expect(screen.getByText('Gender is required.')).toBeInTheDocument();
    });

    test('FormComponent boundary updates form data and clears validation errors on input change', () => {
        render(<Form />);

        const nameInput = screen.getByRole('textbox', { name: /full name/i });
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.blur(nameInput);

        expect(screen.queryByText('Full Name is required.')).not.toBeInTheDocument();
    });
});
