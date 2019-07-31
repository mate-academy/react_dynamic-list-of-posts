import React from 'react';
import propTypes from 'prop-types';
import Comment from './Comment';

const CommentsList = props => (
  <ul key="comments_list">
    {props.comment.map(commentItem => (
      <Comment
        key={commentItem.id}
        commentData={commentItem}
      />
    ))}
  </ul>
);

CommentsList.propTypes = {
  comment: propTypes.arrayOf(propTypes.object).isRequired,
};

export default CommentsList;
