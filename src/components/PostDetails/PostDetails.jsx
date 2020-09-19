import React, { useState, useEffect } from 'react';
import './PostDetails.scss';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, deleteComment } from '../../api/comments';

export const PostDetails = ({ postDetails, postId }) => {
  const { title, body, id } = postDetails;
  const [comments, setComments] = useState([]);
  const [hideComent, setHideComment] = useState(true);

  useEffect(() => {
    getPostComments(postId)
      .then(comments => setComments(comments));
  }, [comments]);

  function habdleButton() {
    setHideComment(() => !hideComent);
  }

  async function deleteComments(commentId) {
    await deleteComment(commentId);
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      { id && (
        <>
          <section className="PostDetails__post">
            <h3>{title}</h3>
            <p>{body}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => habdleButton()}
            >
              {
                `${!hideComent ? `Show` : `Hide`} ${comments.length} commnets`
              }
            </button>

            <ul className="PostDetails__list">
              {
                hideComent && comments.map(comment  => (
                  <li className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteComments(comment.id)}
                    >
                      X
                    </button>
                    <p>{ comment.name }</p>
                    <p>{ comment.body }</p>
                  </li>
                ))
              }
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                setComments={setComments}
                postId={postId}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

PostDetails.propTypes = {
  postDetails: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};
