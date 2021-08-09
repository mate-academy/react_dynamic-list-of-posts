import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, removeCommentFromServer } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(result => setPost(result));
    getPostComments(selectedPostId)
      .then(result => setComments(result));
    setIsCommentsVisible(true);
  }, [selectedPostId]);

  if (post === null) {
    return (
      <div className="PostDetails">
        <h2>Open post to see details</h2>
      </div>
    );
  }

  const handleCommentsVisibility = () => {
    if (isCommentsVisible) {
      setIsCommentsVisible(false);
    } else {
      setIsCommentsVisible(true);
    }
  };

  const removeComment = (commentId) => {
    removeCommentFromServer(commentId)
      .then(() => getPostComments(selectedPostId))
      .then(result => setComments(result));
  };

  const { body } = post;

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleCommentsVisibility}
        >
          {isCommentsVisible
            ? `Hide ${comments.length} comments`
            : `Show ${comments.length} comments`
          }
        </button>

        {isCommentsVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
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
            postId={selectedPostId}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
