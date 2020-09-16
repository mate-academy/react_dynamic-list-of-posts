import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import {
  getPostDetails,
  getPostComments,
  deleteComment,
  addComment,
} from '../../api/posts';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(true);

  const loadComments = () => {
    getPostComments(selectedPostId)
      .then(setComments);
  };

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(setPostDetails);

    loadComments();
  }, [selectedPostId]);

  const getNewComment = (nameValue, emailValue, bodyValue) => {
    addComment(selectedPostId, nameValue, emailValue, bodyValue)
      .then(loadComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setCommentsVisible(!commentsVisible)}
        >
          {`${commentsVisible ? 'Hide' : 'Show'} ${comments.length} comments`}
        </button>

        { commentsVisible
          ? (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deleteComment(comment.id)
                        .then(loadComments);
                    }}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )
          : ''
        }

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            getNewComment={getNewComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.string.isRequired,
};
