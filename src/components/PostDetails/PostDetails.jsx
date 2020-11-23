import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState(0);
  const [comments, setComments] = useState([]);
  const [areCommentsVisible, setCommentsVisible] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(setSelectedPost);
    getPostComments(selectedPostId)
      .then(setComments);
  }, [selectedPostId]);

  const handleClick = () => {
    setCommentsVisible(!areCommentsVisible);
  };

  const handleDelete = (id) => {
    deletePostComment(id)
      .then(() => getPostComments(selectedPostId))
      .then(setComments);
  };

  if (!selectedPost) {
    return '';
  }

  return (
    selectedPost && (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{selectedPost.title}</p>
          <br />
          <p>{selectedPost.body}</p>
        </section>

        {comments && (
          <section className="PostDetails__comments">
            {comments.length > 0 && (
              <button
                type="button"
                className="button"
                onClick={handleClick}
              >
                {areCommentsVisible ? 'Hide' : 'Show'}
                {` ${comments.length} comment`}
                {comments.length > 1 ? 's' : ''}
              </button>
            )}

            {areCommentsVisible && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handleDelete(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
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
              comments={comments}
              setComments={setComments}
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
