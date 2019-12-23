import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comments';

const CommentsList = ({ comments }) => (
  <>
    <h2 className="comment__title">
  Comments:
    </h2>
    <ol type="1">
      {comments.map(comment => (
        <Comment comment={comment} />
      ))}
    </ol>
  </>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentsList;
