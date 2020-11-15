import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments } from '../../api/comments';

import './PostDetails.scss';

export const PostDetails = ({ selectedPost }) => {
  const [post, setPost] = useState(null);
  const [comments, setComment] = useState([]);
  const [commentsVisibility, setCommentsVisibility] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPost)
      .then((info) => {
        setPost(info);
      });
  }, [selectedPost, setPost]);

  getPostComments(selectedPost)
    .then((postComments) => {
      setComment(postComments);
    });

  const toggleComments = () => {
    setCommentsVisibility(!commentsVisibility);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        {post && (
          <p>{post.body}</p>
        )}
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={toggleComments}
        >
          {
            commentsVisibility
              ? 'Hide comments'
              : 'Show comments'
          }
        </button>

        {
          commentsVisibility && comments && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={selectedPost} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPost: PropTypes.number.isRequired,
};
