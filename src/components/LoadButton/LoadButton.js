import React from 'react';
import PropTypes from 'prop-types';
import './LoadButton.css';

const LoadButton = ({ isLoading, getTodos }) => (
  <div className="load-section">
    {
      isLoading
        ? (
          <button
            className="load-btn"
            type="button"
            disabled
          >
            Loading...
          </button>
        ) : (
          <button
            className="load-btn"
            type="button"
            onClick={getTodos}
          >
            Load data
          </button>
        )
    }
  </div>
);

LoadButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  getTodos: PropTypes.func.isRequired,
};

export default LoadButton;
