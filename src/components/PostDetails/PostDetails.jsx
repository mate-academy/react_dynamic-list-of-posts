import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PostType } from '../../Types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, removeComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId, selectedPost }) => {
  const [isCommentShown, setIsCommentShown] = useState(true);
  const [removedComment, setRemovedComment] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [comments, setComments] = useState([]);

  const handleRemove = (commentId) => {
    removeComment(commentId, { method: 'DELETE' })
      .then(comment => setRemovedComment(comment));
  };

  useEffect(() => {
    getPostComments(selectedPostId)
      .then(commentsFromServer => setComments(commentsFromServer));
  }, [selectedPostId, removedComment, newComment]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{`Title: ${selectedPost.title || 'This post hasn\'t title'}`}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setIsCommentShown(current => !current)}
        >
          {`${isCommentShown ? 'Hide ' : 'Show '}${comments.length} comments`}
        </button>

        {isCommentShown && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleRemove(comment.id)}
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
            setNewComment={setNewComment}
            selectedPostId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
  selectedPost: PropTypes.shape(PostType).isRequired,
};
