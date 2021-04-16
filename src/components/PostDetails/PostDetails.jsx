import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(0);
  const [comments, setComments] = useState([]);
  const [isVisible, setVisible] = useState(true);

  const getPosts = async() => {
    const response = await getPostDetails(postId);

    setPost(response);
  };

  const handleClick = () => {
    setVisible(!isVisible);
  };

  const getComments = async() => {
    const response = await getPostComments(postId);

    setComments(response);
  };

  useEffect(() => {
    getPosts();
    getComments();
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
          {`${isVisible ? 'Hide' : 'Show'} ${comments.length} comments`}
        </button>

        <ul className="PostDetails__list">
          {isVisible
            && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deletePostComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
        </ul>
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
