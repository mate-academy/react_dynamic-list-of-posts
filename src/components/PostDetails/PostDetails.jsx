import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PostDetails.scss';

import {
  getPostDetails,
  getPostComments,
  deleteComment,
} from '../../api/posts';

import { NewCommentForm } from '../NewCommentForm';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentsShown, setIsCommentsShown] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(data => setPost(data));
    getPostComments(selectedPostId)
      .then(data => setComments(data));
  }, [selectedPostId]);

  const onDeleteComment = async(commentId) => {
    await deleteComment(commentId);
    await getPostComments(selectedPostId)
      .then(data => setComments(data));
  };

  if (!post) {
    return <h2>Loading...</h2>;
  }

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
            onClick={() => setIsCommentsShown(!isCommentsShown)}
          >
            {isCommentsShown ? 'Hide comments' : 'Show comments'}
          </button>

          {isCommentsShown && (
            <ul className="PostDetails__list">
              {comments.map(({ id, body }) => (
                <li className="PostDetails__list-item" key={id}>
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
          <p className="PostDetails__comments">No comments yet</p>
          <br />
        </>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
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
