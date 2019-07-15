import React from 'react';
import PropTypes from 'prop-types';

function Comments({ comments }) {
  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id} className="post__comment">
          <div className="post__comment-autor">
            <div>
              {comment.name}
            </div>
            <a
              href={comment.email}
              className="post__comment-link"
            >
              {comment.email}
            </a>
          </div>
          <div>
            {comment.body}
          </div>
        </div>
      ))}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Comments;
