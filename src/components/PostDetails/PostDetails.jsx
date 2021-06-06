import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../Comment/Comment';

import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsVisible, setCommentsVisibility] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(response => setPostDetails(response));

    getPostComments(selectedPostId)
      .then(response => setComments(response.slice(0, 2)));
  }, [selectedPostId]);

  const hideButtonHandler = function() {
    setCommentsVisibility(state => !state);
  };

  const reloadComments = (id) => {
    getPostComments(selectedPostId)
      .then(response => setComments(response.slice(0, 2)));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={hideButtonHandler}
        >
          Hide 2 comments
        </button>

        {commentsVisible
          && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <Comment
                  comment={comment}
                  reloadComments={reloadComments}
                />
              </li>
            ))}
          </ul>
          )
        }

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            reloadComments={reloadComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.string.isRequired,
};
