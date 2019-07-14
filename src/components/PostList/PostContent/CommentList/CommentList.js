import React from 'react';
import PropTypes from 'prop-types';

import './CommentList.css';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div className="comment-list">
    <div className="comment-items">
      {
        comments.map(comment => <Comment key={comment.id} comment={comment} />)
      }
    </div>
  </div>
);

const commentsShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
});

CommentList.propTypes = {
  comments: PropTypes.arrayOf(commentsShape).isRequired,
};

export default CommentList;
