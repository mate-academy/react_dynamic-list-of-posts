import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';

import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId).then(setSelectedPost);
  }, [selectedPostId]);

  const loadComments = () => {
    getPostComments(+selectedPostId)
      .then(setComments);
  };

  useEffect(() => {
    loadComments();
  }, [selectedPostId]);

  const addNewComment = (data) => {
    addComment(data)
      .then(loadComments);
  };

  const deleteCommentById = (commentId) => {
    setLoading(true);
    deleteComment(commentId)
      .then(loadComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost.body}</p>
      </section>

      <section className="PostDetails__comments">
        {showComments ? (
          <>
            <button
              type="button"
              className="button"
              onClick={() => setShowComments(false)}
            >
              {`Hide ${comments.length} comments`}
            </button>

            {comments.length === 0 ? (
              <div className="PostDetails__add-comments">
                Add a first comment
              </div>
            ) : (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteCommentById(comment.id)}
                    >
                      {loading ? <Loader /> : 'X'}
                    </button>

                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <button
            type="button"
            className="button"
            onClick={() => setShowComments(true)}
          >
            {`Show ${comments.length} comments`}
          </button>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
