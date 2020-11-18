import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

const PostDetails = ({
  body,
  postId,
  comments,
  onCommentDelete,
  onCommentAdd,
}) => {
  const [isCommentsVisible, setCommentsVisibility] = useState(false);

  const toggleCommentsVisibility = () => {
    setCommentsVisibility(!isCommentsVisible);
  };

  const addComment = (comment) => {
    const commentInfo = Object.assign(comment, { postId });

    onCommentAdd(commentInfo);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length ? (
          <button
            type="button"
            className="button"
            onClick={toggleCommentsVisibility}
          >
            {`${isCommentsVisible ? 'Hide' : 'Show'}
            ${comments.length} comment${comments.length !== 1 ? 's' : ''}`}
          </button>
        )
          : <p>There are no comments for this post</p>}

        {isCommentsVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => comment.body && (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => onCommentDelete(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm onSubmit={addComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  body: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentAdd: PropTypes.func.isRequired,
};

export { PostDetails };
