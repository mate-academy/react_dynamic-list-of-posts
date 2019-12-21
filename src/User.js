import React from 'react';
import PropTypes from 'prop-types';

const User = ({ post }) => (
  <>
    <p className="user">{post.name}</p>
    <p className="user">{post.email}</p>
    <p className="user">
      {`${post.address.city} ${post.address.street} ${post.address.suite}`}
    </p>
  </>
);

User.propTypes
  = { post: PropTypes.objectOf(PropTypes.string).isRequired };

export default User;
