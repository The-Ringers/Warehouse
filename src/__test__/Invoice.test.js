import React from 'react';
import { render } from '@testing-library/react';
import Invoice from '../components/Invoice/Invoice';


describe('Invoice page loads', function () {

    test('The container will display Add Item', () => {
        const { container } = render(<Invoice />)
        expect(container.textContent).toContain("Add Item")
    });

    test('The container will display SKU', () => {
        const { container } = render(<Invoice />)
        expect(container.textContent).toContain('SKU');
    });

    test('The container will display Description', () => {
        const { container } = render(<Invoice />)
        expect(container.textContent).toContain('Description');
    });

    test('The container will display Subtotal', () => {
        const { container } = render(<Invoice />)
        expect(container.textContent).toContain('Subtotal');
    });

    test('The container will display Total', () => {
        const { container } = render(<Invoice />)
        expect(container.textContent).toContain('Total');
    });
});