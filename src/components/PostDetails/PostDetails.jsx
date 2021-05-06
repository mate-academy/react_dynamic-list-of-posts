import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setCommentsVisible] = useState(true);

  const handleClick = () => {
    setCommentsVisible(!isCommentsVisible);
  };

  const handleDeleteComment = (commentId) => {
    deletePostComment(commentId);

    setComments(prevComments => (
      prevComments.filter(comment => (
        postId === comment.postId
      ))
    ));
  };

  useEffect(() => {
    getPostDetails(postId).then(setPost);
    getPostComments(postId).then(setComments);
  }, [comments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleClick}
        >
          {`${isCommentsVisible ? 'Hide' : 'Show'} comments`}
        </button>

        {isCommentsVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleDeleteComment(comment.id)}
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
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
