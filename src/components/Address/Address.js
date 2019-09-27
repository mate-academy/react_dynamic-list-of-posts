import React from 'react';
import PropTypes from 'prop-types';
import './Address.css';

function Address({ address }) {
  const {
    street, suite, city, zipcode,
  } = address;

  return (
    Object.keys(address).length !== 0 ? (
      <div className="address">
        <span>{street}</span>
        <span>{suite}</span>
        <span>{city}</span>
        <span>{zipcode}</span>
      </div>
    )
      : null
  );
}

Address.propTypes = {
  address: PropTypes.shape({
    street: PropTypes.string,
    suite: PropTypes.string,
    city: PropTypes.string,
    zipcode: PropTypes.string,
  }),
};

Address.defaultProps = {
  address: {},
};

export default Address;
