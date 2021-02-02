import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import * as api from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [isVisble, setIsVisble] = useState(false);

  useEffect(() => {
    api.getPostComments(post.id)
      .then(setComments);
  }, [post.id]);

  const commentDelete = async(commentId) => {
    await api.deleteComment(commentId);

    updateComments();
  };

  const updateComments = async() => {
    const commentsFromServer = await api.getPostComments(post.id);

    setComments(commentsFromServer);
  };

  const addCommment = async(commentId) => {
    await api.addComment(commentId);

    updateComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setIsVisble(!isVisble)}
        >
          {isVisble ? 'Hide comments' : 'Show comments'}
        </button>

        {isVisble && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => commentDelete(comment.id)}
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
          <NewCommentForm
            onAdd={addCommment}
            postId={post.id}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
