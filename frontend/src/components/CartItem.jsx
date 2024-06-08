import React from 'react';

const CartItem = ({ item, onRemove }) => {
    return (
        <div className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
    );
};

export default CartItem;
