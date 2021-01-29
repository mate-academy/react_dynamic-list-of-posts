import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [details, setDetails] = useState({});
  const [comments, setComments] = useState({});
  const [commentsShown, setCommentsShown] = useState(true);

  useEffect(() => {
    getPostDetails(postId).then(setDetails);
    getPostComments(postId).then(setComments);
  }, [postId]);

  const deleteComment = (commentId) => {
    const commentsFilter = comments.filter(comment => comment.id !== commentId);

    setComments(commentsFilter);
  };

  const addComment = ({ name, email, body }) => {
    const id = Math.random();

    setComments([...comments, {
      id, postId, name, email, body,
    }]);
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
            {commentsShown ? (
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
            ) : ''}
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
