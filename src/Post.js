import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const Post = ({ title, body, name, email, city }) => (
  <>
    <h2 className="post__title">
      {title}
    </h2>
    <p className="post__body">
      {`"`}
      {body}
      {`"`}
    </p>
    <User
      name={name}
      email={email}
      city={city}
    />
  </>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default Post;
