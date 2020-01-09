import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

function CommentList({ comments }) {
  return (
    comments.map(item => <Comment comment={item} key={item.id} />)
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
