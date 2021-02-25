import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import {
  getPostComments,
  removeComment,
  addNewComment,
} from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState('');
  const [hideComments, setHideComments] = useState(false);

  useEffect(() => {
    getPostDetails(postId).then(setPost);
    getPostComments(postId).then(setComments);
  }, [postId]);

  const deleteComment = (commentId) => {
    removeComment(commentId)
      .then(() => getPostComments(postId))
      .then(setComments);
  };

  const addComment = (name, email, body) => {
    addNewComment(postId, name, email, body)
      .then(() => getPostComments(postId))
      .then(setComments);
  };

  if (!post) {
    return <p>No open post details</p>;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0
          ? (
            <button
              type="button"
              className="button"
              onClick={() => {
                setHideComments(!hideComments);
              }}
            >
              {hideComments
                ? `Show ${comments.length} comments`
                : `Hide ${comments.length} comments`}
            </button>
          )
          : <p>No comments yet</p>
        }

        {!hideComments
          && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >

                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>

                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )
        }
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
  postId: PropTypes.number.isRequired,
};
