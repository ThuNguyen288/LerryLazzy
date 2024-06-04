import React, { useState, useEffect } from 'react';
import '../App.css';

const Alert = ({ errorMessage, hideError }) => {
  const [modalDisplay, setModalDisplay] = useState('none');

  const openModal = () => {
    setModalDisplay('block');
  };

  const closeModal = () => {
    setModalDisplay('none');
    hideError(null); // Assuming hideError is a function to clear the error
  };

  useEffect(() => {
    if (errorMessage !== null) {
      openModal();
    } else {
      closeModal();
    }
  }, [errorMessage]); // Dependency array for useEffect

  return (
    <div
      className="alert alert-danger alert-dismissable mt-4"
      role="alert"
      id="alertPopUp"
      style={{ display: modalDisplay }}
    >
      <div className="d-flex alertMessage">
        <span>{errorMessage}</span>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Alert;