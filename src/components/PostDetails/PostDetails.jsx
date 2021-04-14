import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getPostComments, getPostDetails, removeComment } from '../../api/api';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [areCommentsVisible, setCommentsVisible] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId).then(setPostDetails);
  }, [selectedPostId]);

  useEffect(() => {
    getPostComments(selectedPostId).then(setComments);
  }, [selectedPostId]);

  if (postDetails === null) {
    return <Loader />;
  }

  const filteredComments = comments.filter(
    comment => comment.postId === selectedPostId,
  );

  const addComment = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  const deleteComment = (commentId) => {
    removeComment(commentId);
    setComments(prevComments => prevComments.filter(
      comment => comment.id !== commentId,
    ));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          Title:
          {postDetails.title}
        </p>
        <p>
          Created:
          {postDetails.createdAt}
        </p>
        <p>
          Last update:
          {postDetails.updatedAt}
        </p>
      </section>

      <section className="PostDetails__comments">

        {areCommentsVisible ? (
          <>
            <button
              type="button"
              className="button"
              onClick={() => setCommentsVisible(false)}
            >
              Hide
              {' '}
              {filteredComments.length}
              {' '}
              comments
            </button>

            <ul className="PostDetails__list">
              {filteredComments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
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
          </>
        ) : (

          <button
            type="button"
            className="button"
            onClick={() => setCommentsVisible(true)}
          >
            Show
            {' '}
            {filteredComments.length}
            {' '}
            comments
          </button>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            comments={filteredComments}
            addComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
