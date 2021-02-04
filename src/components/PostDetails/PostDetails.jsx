import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  getPostDetails,
  getPostComments,
  deleteComment,
  addComment,
} from '../../api/posts';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    getPostDetails(postId)
      .then(newPost => setPost(newPost));

    getPostComments(postId)
      .then((comm) => {
        setComments(comm);
      });
  }, [postId]);

  const handleHiding = () => {
    setShowComments(!showComments);
  };

  const handleDelete = (id) => {
    deleteComment(id)
      .then(() => {
        getPostComments(postId)
          .then((comm) => {
            setComments(comm);
          });
      });
  };

  const handleAdd = (obj) => {
    addComment({
      ...obj, postId,
    })
      .then(() => {
        getPostComments(postId)
          .then((comm) => {
            setComments(comm);
          });
      });
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
          onClick={handleHiding}
        >
          {showComments === true
            ? 'Hide '
            : 'Show '}
          {comments.length}
          {' '}
          comments
        </button>

        {showComments
          && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => handleDelete(comment.id)}
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
          <NewCommentForm addComment={handleAdd} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
