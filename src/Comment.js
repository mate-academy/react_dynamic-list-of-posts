import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ commentData }) => (
  <>
    <dt>
      {commentData.name}
      <br />
      {commentData.email}
    </dt>
    <dd>{commentData.body}</dd>
  </>
);

Comment.propTypes = {
  commentData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
