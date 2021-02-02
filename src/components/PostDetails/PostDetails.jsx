import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { deleteComments, getPostComments, postComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({
  selectedPost,

}) => {
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(false);

  const addComment = (title, email, userName) => {
    postComments(selectedPost.id, title, email, userName)
      .then(() => {
        loadComments();
      });
  };

  const loadComments = () => {
    getPostComments(selectedPost.id)
      .then(setComments);
  };

  useEffect(() => {
    loadComments();
    setVisibleComments(false);
  }, [selectedPost]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost.title}</p>
      </section>

      <section className="PostDetails__comments">
        {visibleComments ? (
          <button
            type="button"
            className="button"
            onClick={() => {
              setVisibleComments(false);
            }}
          >
            Hide
            {' '}
            {comments.length}
            {' '}
            comments
          </button>
        ) : (
          <button
            type="button"
            className="button"
            onClick={() => {
              setVisibleComments(true);
            }}
          >
            Show
            {' '}
            {comments.length}
            {' '}
            comments
          </button>
        )}

        <ul className="PostDetails__list">
          {visibleComments && comments.map(comment => (
            <li
              key={comment.id}
              className="PostDetails__list-item"
            >
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => {
                  deleteComments(comment.id)
                    .then(() => {
                      loadComments();
                    });
                }}
              >
                X
              </button>

              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
