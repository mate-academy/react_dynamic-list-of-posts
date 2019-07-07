import React from 'react';
import PropTypes from 'prop-types';
import './NotLoaded.css';

const NotLoaded = ({ isLoading, fetchData }) => (
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
        )
        : (
          <button
            className="load-btn"
            type="button"
            onClick={fetchData}
          >
            Load data
          </button>
        )
    }
  </div>
);

NotLoaded.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default NotLoaded;
