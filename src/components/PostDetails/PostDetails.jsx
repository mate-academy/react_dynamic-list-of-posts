import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PostDetails.scss';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, deleteComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';

export const PostDetails = ({ selectedPostId }) => {
  const [isVisibleComments, setIsVisibleComments] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(setSelectedPost);

    getPostComments(selectedPostId)
      .then(setComments);
  }, [selectedPostId, comments]);

  if (!selectedPost) {
    return <span>Loading...</span>;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost.title}</p>
        <br />
        <p>{selectedPost.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setIsVisibleComments(!isVisibleComments)}
          >
            {isVisibleComments
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`
            }
          </button>
        )}

        {isVisibleComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment.id)}
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
          <NewCommentForm selectedPostId={selectedPostId} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
