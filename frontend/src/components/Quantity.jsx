import React, { useState } from 'react';

const QuantityForm = () => {
  const [quantity, setQuantity] = useState(0);

  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value); // Convert input value to an integer
    setQuantity(newQuantity); // Update quantity state
    // Handle form submission here with the new quantity value
    console.log("Quantity:", newQuantity);
  };

  return (
    <form className='bg-secondary'>
        <input
          className='text-center rounded-pill w-10'
          type="number"
          value={quantity}
          onChange={handleChange}
          min="0" // Optional: specify a minimum value
          step="1" // Optional: specify the step size
        />
    </form>
    
  );
};

export default QuantityForm;
