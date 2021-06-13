import React, { useState, useEffect } from 'react';
import './PostDetails.scss';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import {
  getPostDetails,
  getPostComments,
  deleteComment,
  createComment,
} from '../../api/posts';

export const PostDetails = React.memo(({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [postComments, setPostComments] = useState(null);
  const [commentsVisible, setCommentsVisible] = useState(true);

  useEffect(() => {
    Promise.all([
      getPostDetails(selectedPostId),
      getPostComments(selectedPostId),
    ])
      .then(([details, comments]) => {
        setPostDetails(details);
        setPostComments(comments);
        setCommentsVisible(true);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.warn(error));
  }, [selectedPostId]);

  const handleDeleteComment = (id) => {
    deleteComment(id)
      .then(() => getPostComments(selectedPostId))
      .then(setPostComments);
  };

  const handleCreateComment = (data) => {
    if (Object.values(data).some(entry => entry.length === 0)) {
      return;
    }

    createComment(data)
      .then(() => getPostComments(selectedPostId))
      .then(setPostComments);
  };

  return (
    <>
      {postDetails !== null && (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{postDetails.body}</p>
          </section>

          {postComments !== null && (
            <section className="PostDetails__comments">
              {postComments.length > 0 && (
                <button
                  type="button"
                  className="button"
                  onClick={() => setCommentsVisible(!commentsVisible)}
                >
                  {`${commentsVisible ? 'Hide' : 'Show'} `}
                  {`${postComments.length} comments`}
                </button>
              )}

              {commentsVisible && (
                <ul className="PostDetails__list">
                  {postComments.map(({ id, body }) => (
                    <li
                      key={id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => handleDeleteComment(id)}
                      >
                        X
                      </button>
                      <p>{body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                selectedPostId={selectedPostId}
                onAddComment={handleCreateComment}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
});

PostDetails.propTypes = {
  selectedPostId: PropTypes.number,
};

PostDetails.defaultProps = {
  selectedPostId: 0,
};
