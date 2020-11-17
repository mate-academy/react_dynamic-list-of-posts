import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Comment } from './Comment';

export const CommentsList = ({ postComments, deleteComment }) => {
  const [isCommentShown, setIsCommentShown] = useState(false);

  if (postComments.length === 0) {
    return <p>No comments</p>;
  }

  return (
    <section className="PostDetails__comments">
      {isCommentShown
        ? (
          <div>
            <button
              type="button"
              className="button"
              onClick={() => setIsCommentShown(false)}
            >
              {`Hide ${postComments.length} comment(s)`}
            </button>

            <ul className="PostDetails__list">
              {postComments.map(comment => (
                <Comment comment={comment} onDelete={deleteComment} />
              ))}
            </ul>
          </div>
        )
        : (
          <button
            type="button"
            className="button"
            onClick={() => setIsCommentShown(true)}
          >
            {`Open ${postComments.length} comment(s)`}
          </button>
        )
      }
    </section>
  );
};

CommentsList.defaultProps = {
  postComments: [],
};

CommentsList.propTypes = {
  postComments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    postId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })),
  deleteComment: PropTypes.func.isRequired,
};
