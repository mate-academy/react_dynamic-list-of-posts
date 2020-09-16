import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import { deleteComment } from '../../api/api';
import './PostDetails.scss';

export const PostDetails = ({ title, postId, comments }) => {
  const [commentsShow, hideComments] = useState(true);

  return (
    <div className="PostDetails">
      {postId !== '' ? (
        <>
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>
              {title}
            </p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => hideComments(!commentsShow)}
            >
              {`${commentsShow ? 'Hide' : 'Show'} ${comments.length} comments`}
            </button>

            {commentsShow && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    key={comment.id}
                    className="PostDetails__list-item"
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteComment(comment.id)}
                      value={comment.id}
                    >
                      X
                    </button>
                    <p>
                      {comment.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={postId}
              />
            </div>
          </section>
        </>
      ) : (
        <h2>Please select a post in left column!!!</h2>
      )}
    </div>
  );
};

PostDetails.defaultProps = {
  title: '',
};

PostDetails.propTypes = {
  title: PropTypes.string,
  postId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
