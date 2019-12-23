import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (

  <>
    <p>
      <span className="author__name">{`Name: ${user.name}`}</span>
      <span className="author__mail">{`E-mail: ${user.email}`}</span>
    </p>
    <p>
      <span className="author__address">
        {
          `Address:
         ${user.address.city}
        ${user.address.street}
        ${user.address.suite}`
        }
      </span>
      <span className="author__zipcode">
        {`Zipcode:  ${user.address.zipcode}`}
      </span>
    </p>

  </>
);

User.propTypes = {
  user: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])),
};
User.defaultProps = { user: [] };
export default User;
