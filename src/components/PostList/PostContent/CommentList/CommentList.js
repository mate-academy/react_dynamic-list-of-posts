import React from 'react';
import PropTypes from 'prop-types';

import './CommentList.css';

const CommentList = ({ comments, hideFunction }) => (
  <div style={{
    marginTop: 5,
    borderTop: '1px solid rgba(34,36,38,.15)',
  }}
  >
    <div className="comment-items">
      {
        comments.map(comment => (
          <div className="comment-item">
            <h3>{comment.email}</h3>
            {comment.body}
          </div>
        ))
      }
    </div>
    <div
      className="comment-hide"
      role="button"
      tabIndex={0}
      onKeyUp={() => {}}
      onClick={hideFunction}
    >
      Hide comments
    </div>
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  hideFunction: PropTypes.func.isRequired,
};

export default CommentList;
