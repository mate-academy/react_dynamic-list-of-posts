import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { addComment } from '../../api/posts';
import './PostDetails.scss';

export const PostDetails = ({
  post,
  comments,
  deleteComment,
  loadComments,
  isChoosen,
}) => {
  const [hidden, setHidden] = useState(true);

  const commentUpdate = (postId, name, email, body) => addComment(postId, name, email, body);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {isChoosen && post && (
        <>
          <section className="PostDetails__post">
            <p>{post.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setHidden(!hidden)}
            >
              {hidden
                ? `Hidden ${comments.length} `
                  + `comment${comments.length !== 1 ? 's' : ''}`
                : `Hide ${comments.length} `
                  + `comment${comments.length !== 1 ? 's' : ''}`}
            </button>

            {!hidden && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
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
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={post.id}
                commentUpdate={(postId, name, email, body) => {
                  commentUpdate(postId, name, email, body)
                    .then(() => loadComments(post.id));
                }}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  deleteComment: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  isChoosen: PropTypes.bool.isRequired,
};

PostDetails.defaultProps = {
  post: null,
};
