import React from 'react';
import PropTypes from 'prop-types';

function User(props) {
  const { name, email, address } = props.user;

  return (
    <div className="user">
      <div>
        {name}
      </div>
      <div>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
      <div>
        <div>
          street:
          {address.street}
        </div>
        <div>
          city:
          {address.city}
        </div>
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default User;
