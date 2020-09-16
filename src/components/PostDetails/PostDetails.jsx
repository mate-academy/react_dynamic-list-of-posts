import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [comments, setComments] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(details => setSelectedDetails(details));

    getPostComments(selectedPostId)
      .then(result => setComments(result));
  }, [selectedPostId]);

  const hide = () => {
    setIsHidden(!isHidden);
  };

  return (
    selectedDetails && (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <h3>{selectedDetails.title}</h3>
          <p>{selectedDetails.body}</p>
        </section>

        <section className="PostDetails__comments">
          {comments.length !== 0 && (
            <button
              type="button"
              className="button"
              onClick={hide}
            >
              {`${isHidden ? 'Show' : 'Hide'} ${comments.length} comments`}
            </button>
          )}
          {!isHidden && (
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
                      deletePostComment(comment.id)
                        .then(() => getPostComments(selectedPostId))
                        .then(data => setComments(data));
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
              postId={selectedPostId}
              setComments={setComments}
              comments={comments}
            />
          </div>
        </section>
      </div>
    )
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
