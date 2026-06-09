import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useState } from 'react';
import './checkoutPage.css';
import './checkout-header.css';
import { Link } from 'react-router-dom'
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

   useEffect(() => {
   const fetchDataCheckout = async () => {
     let response=await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data);
       
        response=await axios.get('/api/payment-summary')
            setPaymentSummary(response.data);
    
   };
    fetchDataCheckout();

    }, [])

    return (
        <>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <Link to="/">
                            <img className="logo" src="/images/logo.png" />
                            <img className="mobile-logo" src="/images/mobile-logo.png" />
                        </Link>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<Link className="return-to-home-link"
                            to="/">{paymentSummary?.totalItems ?? cart.length} items</Link>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="/images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                  <OrderSummary cart={cart} deliveryOptions={deliveryOptions}/>

                  <PaymentSummary paymentSummary={paymentSummary}/>
                </div>
            </div>
        </>
    );
}