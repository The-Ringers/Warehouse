import React from 'react';
import { render } from '@testing-library/react';
import Contact from '../components/Contact/Contact';

describe('Contact page loads', function () {
    //before
    it('This container will display Contact', () => {
        const { container } = render(<Contact />)
        expect(container.textContent).toContain("Contact")
    });

    it('This container will display Us', () => {
        const { container } = render(<Contact />)
        expect(container.textContent).toContain('Us');
    });

    it('This container will display Email', () => {
        const { container } = render(<Contact />)
        expect(container.textContent).toContain('Email');
    });

    it('This container will display Name', () => {
        const { container } = render(<Contact />)
        expect(container.textContent).toContain('Name');
    });

    it('This container will display Submit', () => {
        const { container } = render(<Contact />)
        expect(container.textContent).toContain('Submit');
    });
});