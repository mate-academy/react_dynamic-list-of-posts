import React, { useEffect, useState } from 'react';

import './PostDetails.scss';

import PropTypes from 'prop-types';

import { getPostDetails } from '../../api/posts';
import { addComment, deleteComment, getPostComments } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';

import { Loader } from '../Loader';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentShown, setCommentShown] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId).then(setPost);
    getPostComments(selectedPostId).then(setComments);
  }, [selectedPostId]);

  if (!post) {
    return (
      <Loader />
    );
  }

  const onDeleteComment = async(commentId) => {
    await deleteComment(commentId);
    await getPostComments(selectedPostId).then(setComments);
  };

  const addNewComment = (name, email, body) => {
    const comment = {
      name,
      email,
      body,
      postId: selectedPostId,
    };

    addComment(comment)
      .then((result) => {
        setComments(currentList => [...currentList, result]);
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      {comments.length > 0 ? (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={() => setCommentShown(!commentShown)}
          >
            {commentShown ? 'Hide comments' : 'Show comments'}
          </button>

          {commentShown && (
            <ul className="PostDetails__list">
              {comments.map(({ id, body }) => (
                <li key={id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => onDeleteComment(id)}
                  >
                    X
                  </button>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <>
          <p>No comments</p>
          <br />
        </>
      )}
      <br />

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm onAdd={addNewComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
