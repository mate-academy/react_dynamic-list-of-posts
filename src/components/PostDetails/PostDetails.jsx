import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { fetchPostDetails } from '../../api/posts';
import { deleteComment } from '../../api/comments';
import { Comment } from './comment';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const addComent = (comment) => {
    const changedComments = [...postComments, comment];

    setPostComments(changedComments);
  };

  const handleDelete = async(commentId) => {
    await deleteComment(commentId);
    const changedComments = postComments
      .filter(comment => comment.id !== +commentId);

    setPostComments(changedComments);
  };

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    fetchPostDetails(selectedPostId, setPostDetails, setPostComments);
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleVisible}
        >
          {`${isVisible ? 'Hide' : 'Show'} ${postComments.length} comments`}
        </button>

        {isVisible && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <Comment
                comment={comment}
                key={comment.id}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        )}

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            addComent={addComent}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.string.isRequired,
};
