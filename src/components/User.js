import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user: { name, email, address } }) => (
  <section>
    <p>{name}</p>
    <p>{email}</p>

    <address>
      {Object.entries(address)
        .map(([key, value]) => typeof value !== 'object' && (
          <React.Fragment key={key}>
            {key}
            {' '}
            {value}
            <br />
          </React.Fragment>
        ))
      }
    </address>
  </section>
);

User.propTypes = { user: PropTypes.shape({
  name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.object,
}).isRequired };

export default User;
