import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ postDetails,
  comments, removeComment, postComment }) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {postDetails.title}
        </p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsCommentsVisible(current => !current);
          }}

        >
          { isCommentsVisible
            ? `Show ${comments.length} comments`
            : `Hide ${comments.length} comments` }
        </button>

        {!isCommentsVisible && (
        <ul className="PostDetails__list">
          {comments.map(comment => (
            <li
              key={comment.id}
              className="PostDetails__list-item"
            >
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => {
                  removeComment(comment.id);
                }}
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
          {postDetails.id && (
          <NewCommentForm
            isrequired
            postId={postDetails.id}
            postComment={postComment}
          />
          )}
        </div>
      </section>
    </div>
  );
};

PostDetails.defaultProps = {
  postDetails: {},
};
PostDetails.propTypes = {
  postDetails: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string,
  })).isRequired,
  removeComment: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
};
