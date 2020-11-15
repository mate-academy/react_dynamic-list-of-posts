import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import {
  getPostComments,
  deletePostComment,
  addPostComment,
} from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [areCommentsVisible, setCommentsVisible] = useState(true);

  const loadComments = () => {
    getPostComments(post.id)
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  useEffect(() => {
    loadComments();
  }, [post.id]);

  const getNewComment = (newComment) => {
    addPostComment(newComment, post.id)
      .then(loadComments);
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
          onClick={() => {
            if (comments.length > 0) {
              setCommentsVisible(!areCommentsVisible);
            }
          }}
        >
          {areCommentsVisible
            ? `Hide ${comments.length} comments`
            : `Show ${comments.length} comments`
          }
        </button>

        { !areCommentsVisible ? null
          : (
            <ul className="PostDetails__list">
              { comments.map(comment => (
                <li className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deletePostComment(comment.id)
                        .then(loadComments);
                    }}
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
          <NewCommentForm getNewComment={getNewComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};
