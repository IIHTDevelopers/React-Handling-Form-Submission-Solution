import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DynamicInput from '../../components/DynamicInput';
import '@testing-library/jest-dom/extend-expect';

describe('boundary', () => {
    test('DynamicInputComponent boundary renders a text input', () => {
        const config = { type: 'text', label: 'Full Name', name: 'name', required: true };
        const value = '';
        const onChange = jest.fn();

        render(<DynamicInput config={config} value={value} onChange={onChange} />);

        const inputElement = screen.getByRole('textbox', { name: '' });
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'text');
    });

    test('DynamicInputComponent boundary renders an email input', () => {
        const config = { type: 'email', label: 'Email', name: 'email', required: true };
        const value = '';
        const onChange = jest.fn();

        render(<DynamicInput config={config} value={value} onChange={onChange} />);

        const inputElement = screen.getByRole('textbox', { name: '' });
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'email');
    });

    test('DynamicInputComponent boundary renders a dropdown input', () => {
        const config = { type: 'dropdown', label: 'Gender', name: 'gender', options: ['Male', 'Female'], required: true };
        const value = '';
        const onChange = jest.fn();

        render(<DynamicInput config={config} value={value} onChange={onChange} />);

        const selectElement = screen.getByRole('combobox', { name: '' });
        expect(selectElement).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Select...' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Male' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Female' })).toBeInTheDocument();
    });

    test('DynamicInputComponent boundary calls onChange when text input value changes', () => {
        const config = { type: 'text', label: 'Full Name', name: 'name', required: true };
        const value = '';
        const onChange = jest.fn();

        render(<DynamicInput config={config} value={value} onChange={onChange} />);
        const inputElement = screen.getByRole('textbox', { name: '' });
        fireEvent.change(inputElement, { target: { value: 'John Doe' } });

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('DynamicInputComponent boundary calls onChange when dropdown value changes', () => {
        const config = { type: 'dropdown', label: 'Gender', name: 'gender', options: ['Male', 'Female'], required: true };
        const value = '';
        const onChange = jest.fn();

        render(<DynamicInput config={config} value={value} onChange={onChange} />);
        const selectElement = screen.getByRole('combobox', { name: '' });
        fireEvent.change(selectElement, { target: { value: 'Male' } });

        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
