import React from 'react';
import PropTypes from 'prop-types';

function User({ author }) {
  return (
    <div className="post__block-author">
      <span className="post__title-author ">{author.name}</span>
      {' — '}
      <span className="post__title-author ">{author.email}</span>
    </div>
  );
}

User.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
