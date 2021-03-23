import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPostDetails } from '../../api/posts';
import { deleteComment, getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(0);
  const [comments, setComments] = useState([]);
  const [isVisible, setVisibility] = useState(true);

  const getPosts = async() => {
    const response = await getPostDetails(postId);

    setPost(response);
  };

  useEffect(() => {
    getPosts();
  }, [postId]);

  const getComments = async() => {
    const response = await getPostComments(postId);

    setComments(response);
  };

  useEffect(() => {
    getComments();
  }, [postId, comments]);

  const handleClick = () => {
    setVisibility(!isVisible);
  };

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
          {`${isVisible ? 'Hide' : 'Show'} ${comments.length} comments`}
        </button>

        {isVisible
          && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
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
          <NewCommentForm postId={postId} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
