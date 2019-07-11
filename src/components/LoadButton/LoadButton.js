import React from 'react';
import PropTypes from 'prop-types';
import './LoadButton.css';

const LoadButton = ({ isLoading, handleLoad }) => (
  <div className="load-section">
    <button
      type="button"
      className="load-btn"
      disabled={isLoading}
      onClick={handleLoad}
    >
      {
        isLoading ? 'Loading...' : 'Load data'
      }
    </button>
  </div>
);

LoadButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleLoad: PropTypes.func.isRequired,
};

export default LoadButton;
