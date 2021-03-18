import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { deleteComment } from '../../helpers';
import './PostDetails.scss';

export function PostDetails({ post, comments, commentsUpdate }) {
  const [isCommentShow, setCommentShow] = useState(false);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <h3>{post.title}</h3>
      <section className="PostDetails__post">
        <p>{post.body}</p>
        <p>{post.createdAt.slice(0, 10)}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setCommentShow(isShown => !isShown);
          }}
        >
          {`${!isCommentShow ? 'Show' : 'Hide'} ${comments.length} comments`}
        </button>
        {isCommentShow && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(comment.id);
                    commentsUpdate(commentss => commentss);
                  }}
                >
                  X
                </button>
                <p>
                  {comment.body}
                  <br />
                  {comment.createdAt.slice(0, 10)}
                </p>

              </li>
            ))
            }
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={post.id}
          />
        </div>
      </section>
    </div>
  );
}

PostDetails.propTypes = {
  post: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    body: PropTypes.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ),
  commentsUpdate: PropTypes.func.isRequired,
};

PostDetails.defaultProps = {
  comments: [],
};
