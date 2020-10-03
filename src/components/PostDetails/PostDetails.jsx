import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPost, getComments, deleteComment } from '../../api/api';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    getPost(postId).then(setPost);

    getComments().then(arrComments => setComments(arrComments.filter(
      comment => comment.postId === postId,
    )));
  }, [postId]);

  const handleHide = () => {
    setHidden(!hidden);
  };

  const handleDeleteComment = (id) => {
    deleteComment(id)
      .then(() => getComments())
      .then(arrComments => setComments(arrComments.filter(
        comment => comment.postId === postId,
      )));
  };

  if (!post && !comments) {
    return '';
  }

  return (
    <div className="PostDetails">

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleHide}
        >
          {hidden ? 'show' : 'hide'}
          {' '}
          {comments && comments.length}
          {' '}
          comments
        </button>
        {hidden || (
          <ul className="PostDetails__list">
            {comments && comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.name}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <br />
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={postId} setComments={setComments} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
