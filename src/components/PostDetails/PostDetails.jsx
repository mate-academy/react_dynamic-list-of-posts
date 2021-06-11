import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';

import './PostDetails.scss';
import { addComment, deleteComment, getPostComments } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(setSelectedPost);

    setComments(null);

    getPostComments(selectedPostId)
      .then(setComments);
  }, [selectedPostId]);

  const handleVisibleChange = () => setVisible(!isVisible);
  const onDelete = (commentId) => {
    deleteComment(commentId)
      .then(() => setComments(comments.filter(
        comment => commentId !== comment.id,
      )));
  };

  const addNewComment = (name, email, body) => {
    const commentBody = {
      name,
      email,
      body,
      postId: selectedPostId,
    };

    addComment(commentBody)
      .then((result) => {
        setComments(currentComment => [...currentComment, result]);
      });
  };

  return (

    <div className="PostDetails">
      <h2>Post details:</h2>
      {selectedPost !== null && (
        <section className="PostDetails__post">
          <p>{selectedPost.title}</p>
        </section>
      )}

      {comments && (
        <>
          <section className="PostDetails__comments">
            {comments.length !== 0 ? (
              <button
                type="button"
                className="button"
                onClick={handleVisibleChange}
              >
                {isVisible
                  ? `Hide ${comments.length} comments`
                  : 'Show comments'
                      }

              </button>
            )
              : (
                <h3>No comments yet</h3>
              )
            }
            {isVisible && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => onDelete(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}

              </ul>
            )}

          </section>
        </>
      )
      }
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm onAdd={addNewComment} />
        </div>
      </section>
    </div>

  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
