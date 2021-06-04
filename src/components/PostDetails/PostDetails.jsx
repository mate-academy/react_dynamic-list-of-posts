import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments, deleteComment } from '../../api/comments';

export const PostDetails = ({ title, selectedPostId }) => {
  const [hidden, setHide] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostComments()
      .then(commentsFromServer => setComments(commentsFromServer.data));
  }, []);

  const prepearedComments = comments
    .filter(comment => comment.postId === selectedPostId);

  const removeComment = (id) => {
    deleteComment(id)
      .then(getPostComments)
      .then(commentsFromServer => setComments(commentsFromServer.data));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{title}</p>
      </section>

      <section className="PostDetails__comments">
        {prepearedComments.length !== 0 && (
          <button
            type="button"
            className="button"
            onClick={() => (hidden ? setHide(false) : setHide(true))}
          >
            {hidden ? (
              `Show ${prepearedComments.length} comments`
            ) : (
              `Hide ${prepearedComments.length} comments`
            )}
          </button>
        )}

        {!hidden && (
          <ul className="PostDetails__list">
            {prepearedComments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => removeComment(comment.id)}
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
          <NewCommentForm postId={selectedPostId} setComments={setComments} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  title: PropTypes.string,
  selectedPostId: PropTypes.number.isRequired,
};

PostDetails.defaultProps = {
  title: '',
};
