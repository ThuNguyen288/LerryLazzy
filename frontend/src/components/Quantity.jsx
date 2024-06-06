import React, { useState } from 'react';
import "../App.css";

const QuantityForm = () => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10); // Convert input value to an integer
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity); // Update quantity state
    }
  };

  return (
    <form className='quantity d-flex align-items-center'>
      <button 
        type="button"  
        onClick={handleDecrement}
      >
        <i className='fas fa-minus'/>
      </button>
      <input
        className='text-center'
        type="int"
        value={quantity}
        onChange={handleChange}
        min="0"
        step="1"
      />
      <button 
        type="button" 
        onClick={handleIncrement}
      >
        <i className='fas fa-plus'/>
      </button>
    </form>
  );
};

export default QuantityForm;
