import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { deletePostComment, getPostComments } from '../../api/posts';

export const PostComments = ({ selectPostId }) => {
  const [comments, setComments] = useState(null);
  const [isHide, setIsHide] = useState(false);

  const deleteComment = (commentId) => {
    deletePostComment(commentId);
  };

  useEffect(() => {
    getPostComments(selectPostId).then(result => setComments(result));
  }, [comments]);

  return (
    <section className="PostDetails__comments">
      {comments && comments.length > 0
        && (
          <button
            type="button"
            className="button"
            onClick={() => setIsHide(!isHide)}
          >
            {`${isHide ? 'Show ' : 'Hide '} ${comments.length} comments`}
          </button>
        )
      }
      {isHide || (
        <ul className="PostDetails__list">
          {comments && comments.length > 0
            && comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
        </ul>
      )}

      <div className="PostDetails__form-wrapper">
        <NewCommentForm
          selectPostId={selectPostId}
        />
      </div>
    </section>
  );
};

PostComments.propTypes = {
  selectPostId: PropTypes.number.isRequired,
};
