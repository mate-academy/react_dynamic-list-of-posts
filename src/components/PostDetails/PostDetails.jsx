import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState('');
  const [comments, setComments] = useState([]);
  const [isCommentVisible, setIsCommentVisible] = useState(true);

  useEffect(() => {
    getPostDetails(postId)
      .then(result => setPost(result));
  }, [postId]);

  useEffect(() => {
    getPostComments(postId)
      .then(result => setComments(result));
  }, [postId, comments]);

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
          onClick={() => setIsCommentVisible(false)}
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
                  onClick={() => deleteComment(comment.id)}
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
          <NewCommentForm postId={postId} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
