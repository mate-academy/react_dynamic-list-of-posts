import React from 'react';
import PropTypes from 'prop-types';

import './Authors.css';

const Authors = (props) => {
  const address = Object.values(props.user.address)
    .filter(item => typeof item !== 'object')
    .join(', ');

  return (
    <p className="post___author">
      <span>{props.user.username}</span>
      <span>{props.user.email}</span>
      <span>{address}</span>
    </p>
  );
};

Authors.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
  }).isRequired,
};

export default Authors;
