import React from 'react';
import PropTypes from 'prop-types';
import { UserProps } from '../../constants/proptypes';

import './User.css';

const User = ({ name, email, address }) => {
  const { city, street } = address;

  return (
    <div>
      {name && (
        <p className="meta meta__name">
          <span>name: </span>
          {name}
        </p>
      )}
      <p className="meta meta__email">
        <span>email: </span>
        {email}
      </p>
      <div className="meta meta__address">
        <p className="meta__address--city">{`city: ${city}`}</p>
        <p className="meta__address--street">{`street: ${street}`}</p>
      </div>
    </div>
  );
};

User.propTypes = UserProps;

User.defaultProps = {
  address: PropTypes.shape({
    city: null,
    street: null,
  }),
};

export default User;
