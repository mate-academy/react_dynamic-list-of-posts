import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ name, email, body }) => (
  <>
    <dt>
      {name}
      <br />
      {email}
    </dt>
    <dd>{body}</dd>
  </>
);

Comment.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string]).isRequired,
  email: PropTypes.oneOfType([PropTypes.string]).isRequired,
  body: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default Comment;
