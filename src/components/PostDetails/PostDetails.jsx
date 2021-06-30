import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { BASE_URL } from '../../api/api';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [postContent, setPostContent] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const commentsToggler = () => setShowComments(!showComments);

  const setComment = (comment) => {
    setPostComments(currentArray => [...currentArray, comment]);
  };

  const removeComment = (event) => {
    if (postComments.length === 1) {
      setShowComments(false);
    }

    const elementId = +event.target.id.split('_')[1];

    fetch(`${BASE_URL}/comments/${elementId}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response.status);
        }

        return response.json();
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('There was an error!', error);
      });
    setPostComments(currentArray => currentArray
      .filter(comment => comment.id !== elementId));
  };

  useEffect(() => {}, [postComments]);

  useEffect(() => {
    getPostDetails(postId)
      .then(post => setPostContent(post.data.body));

    getPostComments(postId)
      .then(comments => setPostComments(comments));
  }, []);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postContent}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          <button
            type="button"
            className="button"
            onClick={commentsToggler}
          >
            {showComments
              ? `Hide ${postComments.length} comments`
              : `Show comments`
            }
          </button>
        )}

        {
          showComments
          && (
          <ul className="PostDetails__list">
            {
              postComments.map((comment, index) => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    id={`PostDetails-remove-btn_${comment.id}`}
                    className="PostDetails__remove-button button"
                    onClick={removeComment}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))
            }
          </ul>
          )
        }

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            setComment={setComment}
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
