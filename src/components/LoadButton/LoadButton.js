import React from 'react';
import PropTypes from 'prop-types';
import './LoadButton.css';

const LoadButton = ({ isLoading, handleClick }) => (
  <div className="load-section">
    <button
      type="button"
      className="load-btn"
      disabled={isLoading}
      onClick={handleClick}
    >
      {
        isLoading ? 'Loading...' : 'Load data'
      }
    </button>
  </div>
);

LoadButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default LoadButton;
