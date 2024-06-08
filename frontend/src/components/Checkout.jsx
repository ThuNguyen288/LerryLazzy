
import React, { useState } from 'react';
import '../pages/CartPage.css';

const Checkout = ({ totalAmount, onCheckout }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    const handleSubmit = (event) => {
        event.preventDefault();
        const orderDetails = {
            name,
            address,
            paymentMethod,
            totalAmount
        };
        onCheckout(orderDetails);
    };

    return (
        <div className="checkout">
            <h3>Thanh toán</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Tên:</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Địa chỉ:</label>
                    <input 
                        type="text" 
                        id="address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paymentMethod">Phương thức thanh toán:</label>
                    <select 
                        id="paymentMethod" 
                        value={paymentMethod} 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="creditCard">Thẻ tín dụng</option>
                        <option value="paypal">PayPal</option>
                        <option value="cashOnDelivery">Thanh toán khi nhận hàng</option>
                    </select>
                </div>
                <button type="submit">Thanh toán</button>
            </form>
        </div>
    );
};

export default Checkout;
