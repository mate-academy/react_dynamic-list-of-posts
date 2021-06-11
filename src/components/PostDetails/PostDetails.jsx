import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState('');
  const [comments, setComments] = useState('');
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(result => setPost(result));
    getPostComments(selectedPostId)
      .then(result => setComments(result));
  }, [selectedPostId]);

  const handleButton = () => {
    setIsCommentVisible(!isCommentVisible);
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);

    setComments(prevComments => prevComments.filter(
      comment => comment.id !== commentId,
    ));
  };

  const addComment = (comment) => {
    setComments(prevComments => [...prevComments, comment]);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleButton}
        >
          {isCommentVisible
            ? `Hide ${comments.length} comments`
            : `Show ${comments.length} comments`
          }
        </button>

        {isCommentVisible
          && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleDeleteComment(comment.id)}
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
            postId={selectedPostId}
            addComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
