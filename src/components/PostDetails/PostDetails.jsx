import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import * as api from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [details, setDetails] = useState({});
  const [comments, setComments] = useState({});
  const [commentsShown, setCommentsShown] = useState(true);

  useEffect(() => {
    getPostDetails(postId).then(setDetails);
    api.getPostComments(postId).then(setComments);
  }, [postId]);

  const deleteComment = (commentId) => {
    api.deletePostComment(commentId)
      .then(() => api.getPostComments(postId))
      .then(setComments);
  };

  const addComment = ({ name, email, body }) => {
    api.addPostComment({
      postId, name, email, body,
    })
      .then(() => api.getPostComments(postId))
      .then(setComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {postId && details ? (
        <>
          <section className="PostDetails__post">
            <p>
              User: #
              {details.userId}
            </p>
            <p>
              Text:
              {details.title}
            </p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setCommentsShown(!commentsShown);
              }}
            >
              {commentsShown
                ? `Hide ${comments.length} comments`
                : `Show ${comments.length} comments`
              }
            </button>
            {commentsShown && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
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
        </>
      ) : '<<<---Select post'}
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
