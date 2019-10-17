import React from 'react';
import { render } from '@testing-library/react';
import { Sidebar } from '../components/Sidebar/Sidebar';

describe('Sidebar page loads', function () {
    //before
    it('This container will display inventario', () => {
        console.log('here')
        const { container } = render(<Sidebar />)
        expect(container.textContent).toContain("Inventario")
    });

    it('This container will display Invoice', () => {
        const { container } = render(<Sidebar />)
        expect(container.textContent).toContain('Invoice');
    });

    it('This container will display Order', () => {
        const { container } = render(<Sidebar />)
        expect(container.textContent).toContain('Order');
    });

    it('This container will display Quote', () => {
        const { container } = render(<Sidebar />)
        expect(container.textContent).toContain('Quote');
    });

    it('This container will display Logout', () => {
        const { container } = render(<Sidebar />)
        expect(container.textContent).toContain('Logout');
    });
});