import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';

const CommentList = ({ comments }) => comments.map(comment => (
  <Comment comment={comment} key={comment.id} />
));

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});

CommentList.propTypes = {
  comments: PropTypes.arrayOf(shape).isRequired,
};

export default CommentList;
