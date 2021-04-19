import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails, getPostComments } from '../../api/posts';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState('');
  const [comments, setComments] = useState('');
  const [isVisible, setVisible] = useState(true);
  const deleteComment = (commentId) => {
    fetch(`https://mate-api.herokuapp.com/comments/${commentId}`,
      { method: 'DELETE' });
    setComments(current => (
      current.filter(comment => comment.id !== commentId)
    ));
  };

  const addComment = (name, email, body) => {
    const newComment = {
      name,
      email,
      id: Math.floor(new Date().valueOf() / 1000),
      body,
      postId,
    };

    fetch(`https://mate-api.herokuapp.com/comments`, {
      method: 'POST',
      body: JSON.stringify(newComment),
    });
    setComments(current => [newComment, ...current]);
  };

  useEffect(() => {
    getPostDetails(postId, setPost);
    getPostComments(postId, setComments);
    setVisible(true);
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      {comments.length > 0
      && (
      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setVisible(!isVisible)}
        >
          {isVisible ? 'Hide' : 'Show'}
          {' '}
          {comments.length}
          {' '}
          comments
        </button>

        <ul className="PostDetails__list" hidden={!isVisible}>
          {comments.map(comment => (
            <li
              key={comment.id}
              className="PostDetails__list-item"
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
      </section>
      )
    }

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
