import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
  getPostDetails,
  getPostComments,
  removeCommentById,
  createComment,
} from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isVisibleComments, setVisibleComments] = useState(true);

  const loadPosts = async() => {
    setPost(await getPostDetails(postId));
  };

  const loadComments = async() => {
    setComments(await getPostComments(postId));
  };

  const removeComment = async(id) => {
    await removeCommentById(id);
    loadComments();
  };

  const addComment = async({ name, email, body }) => {
    await createComment({
      postId,
      name,
      email,
      body,
    });
    loadComments();
  };

  useEffect(() => {
    loadPosts();
    loadComments();
  }, [postId]);

  const handleHideComments = () => {
    setVisibleComments(!isVisibleComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post && post.title}</p>
      </section>

      {comments.length > 0 && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={() => handleHideComments()}
          >
            {isVisibleComments ? 'Hide comments' : 'Show comments'}
          </button>

          {isVisibleComments && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li
                  key={uuidv4()}
                  className="PostDetails__list-item"
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
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
