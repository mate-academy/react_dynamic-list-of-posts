import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, addComment, deleteComment } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [details, setDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(setDetails);

    getPostComments(selectedPostId)
      .then(setComments);
  }, [selectedPostId]);

  const addNewComment = (name, email, body) => {
    addComment(name, email, body, selectedPostId)
      .then(() => getPostComments(selectedPostId))
      .then(setComments);
  };

  const removeComment = (commentId) => {
    deleteComment(commentId)
      .then(() => getPostComments(selectedPostId))
      .then(setComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{details.body}</p>
      </section>

      <section className="PostDetails__comments">
        {(comments.length > 0)
          ? (
            <button
              type="button"
              className="button"
              onClick={() => setShowComments(!showComments)}
            >
              {showComments
                ? `Hide ${comments.length} comments`
                : 'Show comments'
              }
            </button>
          )
          : 'There is no comments'
        }

        {showComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
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

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.defaultProps = {
  selectedPostId: '',
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number,
};
