import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';
import { Loader } from '../Loader';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [hideComments, setHideComments] = useState(false);

  const getUpdatedComments = () => {
    getPostComments(postId)
      .then(setComments);
  };

  useEffect(() => {
    getPostDetails(postId)
      .then(setPost);
    getPostComments(postId)
      .then(setComments);
  }, [postId]);

  if (!postId) {
    return 'Choose a post';
  }

  if (post === null) {
    return <Loader />;
  }

  return post && (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {!!comments.length && (
          <button
            type="button"
            className="button"
            onClick={() => setHideComments(!hideComments)}
          >
            {hideComments
              ? 'Show '
              : 'Hide '}
            {`${comments.length} comments`}
          </button>
        )}

        {hideComments || (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={async() => {
                    await deletePostComment(comment.id);
                    getUpdatedComments();
                  }}
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
          <NewCommentForm
            postId={postId}
            getUpdatedComments={getUpdatedComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
