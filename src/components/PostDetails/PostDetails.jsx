import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { create, getPostComments, remove } from '../../api/comments';

export const PostDetails = ({ postId, body }) => {
  const [postComments, setPostComments] = useState('');
  const [isHide, setIsHide] = useState(false);

  const loadPostComment = (id) => {
    getPostComments(id)
      .then(result => setPostComments(result));
  };

  useEffect(() => {
    loadPostComment(postId);
  }, [postId]);

  const toggleComments = () => {
    setIsHide(current => !current);
  };

  const addComment = (item) => {
    create(item);

    setTimeout(() => loadPostComment(postId), 100);
  };

  const removeComment = (commentId) => {
    remove(commentId);

    setTimeout(() => loadPostComment(postId), 100);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{body}</p>
      </section>

      {(postComments.length !== 0) ? (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={toggleComments}
          >
            {`${isHide ? 'Show' : 'Hide'} ${postComments.length} comments`}
          </button>
          {(!isHide) && (
            <ul className="PostDetails__list">
              {postComments.map(comment => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
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
      ) : (<div>No comments</div>)}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm id={postId} onAdd={addComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
};
