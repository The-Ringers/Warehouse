import React from 'react';
import { render } from '@testing-library/react';
import Landing from '../components/Landing/Landing';


describe('Landing page loads', function () {
    //before
    it('This container will display The', () => {
        console.log('here')
        const { container } = render(<Landing />)
        expect(container.textContent).toContain("The")
    });

    it('This container will display #1', () => {
        const { container } = render(<Landing />)
        expect(container.textContent).toContain('#1');
    });

    it('This container will display Inventory', () => {
        const { container } = render(<Landing />)
        expect(container.textContent).toContain('Inventory');
    });

    it('This container will display Management', () => {
        const { container } = render(<Landing />)
        expect(container.textContent).toContain('Management');
    });

    it('This container will display Software', () => {
        const { container } = render(<Landing />)
        expect(container.textContent).toContain('Software');
    });
});