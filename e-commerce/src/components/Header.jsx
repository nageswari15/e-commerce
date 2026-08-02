import './header.css';
import { Link } from 'react-router-dom'
import { useState } from 'react';

export function Header({cart = [], onSearch}) {
    const [searchTerm, setSearchTerm] = useState('');
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    const handleChange = (e) => {
        const newTerm = e.target.value;
        setSearchTerm(newTerm);
        if (onSearch) {
            onSearch(newTerm);
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link">
                    <span className="brand-text">
                        ShopNext
                    </span>
                </Link>
            </div>

            <div className="middle-section">
                <input 
                    className="search-bar" 
                    type="text" 
                    placeholder="Search" 
                    value={searchTerm}
                    onChange={handleChange}
                />
                {searchTerm && (
                    <button className="clear-button" onClick={handleClear} title="Clear search">
                        ✕
                    </button>
                )}
            </div>

            <div className="right-section">
                <Link className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </Link>

                <Link className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src="/images/icons/cart-icon.png" />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div>

    );
}
