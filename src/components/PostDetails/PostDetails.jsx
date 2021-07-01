import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  getPostDetails,
  getPostComments,
  removeComment,
  patch,
} from '../../api/posts';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState('');
  const [comments, setComments] = useState([]);
  const [isCommentsShow, isCommentsShowToggle] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId).then(item => setPost(item));

    getPostComments(selectedPostId).then(comment => setComments(comment));
  }, [selectedPostId]);

  const handleSubmit = (event, obj) => {
    event.preventDefault();
    patch(obj).then(() => getPostComments(selectedPostId)
      .then(commentsArr => setComments(commentsArr))
      .then());
  };

  const handleRemove = (commentId) => {
    removeComment(commentId)
      .then(() => getPostComments(selectedPostId))
      .then(commentsArr => setComments(commentsArr));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post ? post.body : 'Loading...'}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => isCommentsShowToggle(!isCommentsShow)}
        >
          {isCommentsShow
            ? `Hide ${comments.length} comments`
            : `Show ${comments.length} comments`}
        </button>

        <ul className="PostDetails__list">
          {comments
            && isCommentsShow
            && comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
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
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={selectedPostId} handleSubmit={handleSubmit} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
