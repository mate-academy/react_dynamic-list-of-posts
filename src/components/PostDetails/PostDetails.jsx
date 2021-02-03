import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, addPostComment,
  deletePostComment } from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState({});
  const [commentsVisibility, setcommentsVisibility] = useState(false);

  useEffect(() => {
    getPostDetails(postId)
      .then(setPostDetails);
    getPostComments(postId)
      .then(setComments);
  }, [postId]);

  const addComment = ({ name, email, body }) => {
    addPostComment({
      postId, name, email, body,
    })
      .then(() => getPostComments(postId))
      .then(setComments);
  };

  const deleteComment = (commentId) => {
    deletePostComment(commentId)
      .then(() => getPostComments(postId))
      .then(setComments);
  };

  if (!postDetails) {
    return <p>Select the post</p>;
  }

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
            setcommentsVisibility(!commentsVisibility);
          }}
        >
          {commentsVisibility
            ? `Hide comments`
            : `Show ${comments.length} comments`
          }
        </button>

        {commentsVisibility && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
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
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
