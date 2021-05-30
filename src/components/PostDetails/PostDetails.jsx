import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, addComment } from '../../api/comments';

export const PostDetails = ({ postId, remove }) => {
  const [details, setDetails] = useState({});
  const [comments, setComents] = useState([]);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    getPostDetails(postId)
      .then(postDetails => setDetails(postDetails));
  }, [postId]);

  useEffect(() => {
    getPostComments(postId)
      .then(setComents);
  });

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{details.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
        <button
          type="button"
          className="button"
          onClick={() => setHide(!hide)}
        >
          {`${!hide ? 'Hide' : 'Show'} ${comments.length} comments`}
        </button>
        )}

        {!hide && (
        <ul className="PostDetails__list">
          {comments.map(comment => (
            <li
              key={comment.id}
              className="PostDetails__list-item"
            >
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => remove(comment.id)}
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
            addComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};
