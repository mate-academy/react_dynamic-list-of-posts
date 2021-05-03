import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [postNow, setPostNow] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (postId !== 0) {
      getPostDetails(postId)
        .then(result => setPostNow(result));

      getPostComments()
        .then(result => result.filter(comment => comment.postId === postId))
        .then(result => setComments(result));
    }
  }, [postId, value]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          { postNow.body }
        </p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          hidden={commentsVisible}
          onClick={() => setCommentsVisible(true)}
        >
          Hide
          &nbsp;
          {comments.length}
          &nbsp;
          comments
        </button>
        <button
          type="button"
          className="button"
          hidden={!commentsVisible}
          onClick={() => setCommentsVisible(false)}
        >
          Show
          &nbsp;
          {comments.length}
          &nbsp;
          comments
        </button>

        <ul className="PostDetails__list" hidden={commentsVisible}>
          {comments.map(comment => (
            <li className="PostDetails__list-item" key={comment.id}>
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => {
                  deletePostComment(comment.id);
                  setValue(value + 1);
                }}
              >
                X
              </button>
              <p>
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            setValue={setValue}
            value={value}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
