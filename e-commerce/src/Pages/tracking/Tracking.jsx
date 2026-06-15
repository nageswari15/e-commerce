import axios from 'axios';
import dayjs from 'dayjs';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './tracking.css';
import { Header } from '../../components/Header';
import { formatMoney } from '../../utils/money';

export function Tracking({ cart }) {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`/api/orders/${orderId}?expand=products`);
                setOrder(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching order:', err);
                setError('Order not found');
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <>
                <Header cart={cart} />
                <div className="tracking-page">
                    <div className="order-tracking">
                        <p>Loading...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !order) {
        return (
            <>
                <Header cart={cart} />
                <div className="tracking-page">
                    <div className="order-tracking">
                        <p>{error || 'Order not found'}</p>
                        <Link to="/orders" className="back-to-orders-link link-primary">
                            View all orders
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    // Calculate delivery progress based on order time
    const orderDate = dayjs(order.orderTimeMs);
    const daysSinceOrder = dayjs().diff(orderDate, 'day');
    
    let currentStatus = 'Preparing';
    let progressPercentage = 0;

    if (daysSinceOrder >= 3) {
        currentStatus = 'Delivered';
        progressPercentage = 100;
    } else if (daysSinceOrder >= 1) {
        currentStatus = 'Shipped';
        progressPercentage = 50;
    } else {
        progressPercentage = 25;
    }

    return (
        <>
            <Header cart={cart} />
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link to="/orders" className="back-to-orders-link link-primary">
                        View all orders
                    </Link>

                    <div className="order-id">
                        Order ID: {order.id}
                    </div>

                    {order.products && order.products.map((orderProduct, index) => {
                        const product = orderProduct.product || {};
                        const deliveryDate = dayjs(orderProduct.estimatedDeliveryTimeMs);

                        return (
                            <div key={`${order.id}-${index}`}>
                                <div className="delivery-date">
                                    Arriving on {deliveryDate.format('dddd, MMMM D')}
                                </div>

                                <div className="product-info">
                                    {product.name}
                                </div>

                                <div className="product-info">
                                    Quantity: {orderProduct.quantity}
                                </div>

                                {product.image && (
                                    <img className="product-image" src={product.image} alt={product.name} />
                                )}

                                <div className="progress-labels-container">
                                    <div className="progress-label">
                                        Preparing
                                    </div>
                                    <div className={`progress-label ${currentStatus === 'Shipped' ? 'current-status' : ''}`}>
                                        Shipped
                                    </div>
                                    <div className={`progress-label ${currentStatus === 'Delivered' ? 'current-status' : ''}`}>
                                        Delivered
                                    </div>
                                </div>

                                <div className="progress-bar-container">
                                    <div 
                                        className="progress-bar" 
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
