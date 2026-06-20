import {it,expect,describe,vi, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import '@testing-library/jest-dom';

import {HomePage} from './HomePgae';

vi.mock('axios');
vi.mock('../../components/Header', () => ({
  Header: () => <div data-testid="header">Header</div>
}));
vi.mock('./productsGrid', () => ({
  ProductsGrid: ({ products }) => (
    <div data-testid="products-grid">
      {products.map(product => (
        <div key={product.id} data-testid={`product-${product.id}`}>
          {product.name}
        </div>
      ))}
    </div>
  )
}));

describe('home page components', () => {
  let mockProducts;
  let mockCart;
  let mockLoadCart;

  beforeEach(() => {
    mockProducts = [
      {
        id: 'product1',
        name: 'Test Product 1',
        image: 'test1.jpg',
        priceCents: 1000
      },
      {
        id: 'product2',
        name: 'Test Product 2',
        image: 'test2.jpg',
        priceCents: 2000
      }
    ];
    mockCart = [];
    mockLoadCart = vi.fn();
    vi.clearAllMocks();
  });

  it('display products correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: mockProducts });

    render(<HomePage cart={mockCart} loadCart={mockLoadCart} />);

    // Wait for the axios call to complete and products to be displayed
    const productsGrid = await screen.findByTestId('products-grid');
    
    expect(axios.get).toHaveBeenCalledWith('/api/products');
    expect(productsGrid).toBeInTheDocument();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('renders header component', async () => {
    axios.get.mockResolvedValueOnce({ data: mockProducts });

    render(<HomePage cart={mockCart} loadCart={mockLoadCart} />);

    const header = await screen.findByTestId('header');
    expect(header).toBeInTheDocument();
  });
  it('handles empty products list', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<HomePage cart={mockCart} loadCart={mockLoadCart} />);

    const productsGrid = await screen.findByTestId('products-grid');
    expect(productsGrid).toBeInTheDocument();
  });
});