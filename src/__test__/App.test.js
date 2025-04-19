import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Form from '../components/Form';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../components/Form');

describe('boundary', () => {
    test('AppComponent boundary renders the App component with a title and Form component', () => {
        Form.mockImplementation(() => <div data-testid="form">Mocked Form</div>);

        render(<App />);

        expect(screen.getByText('Dynamic Form with Validation')).toBeInTheDocument();
        expect(screen.getByTestId('form')).toBeInTheDocument();
    });
});
