import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import
{ getPostComments, sendComment, deleteComment } from '../../api/comments';

import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsVisibility, setCommentsVisibility] = useState(true);

  const commentsHandle = () => {
    setCommentsVisibility(!commentsVisibility);
  };

  useEffect(() => {
    const getDetails = async() => {
      const selectedPost = await getPostDetails(selectedPostId);
      const postComments = await getPostComments(selectedPostId);

      setPost(selectedPost.data);
      setComments(postComments.data);
    };

    getDetails();
  }, [selectedPostId]);

  const getDetails = async() => {
    const selectedPost = await getPostDetails(selectedPostId);
    const postComments = await getPostComments(selectedPostId);

    setPost(selectedPost.data);
    setComments(postComments.data);
  };

  const addComment = async(postId, inputName, inputEmail, inputMessage) => {
    await sendComment(postId, inputName, inputEmail, inputMessage);
    getDetails();
  };

  const deleteSelectedComment = async(commentId) => {
    await deleteComment(commentId);
    getDetails();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length !== 0
          && (
            <button
              type="button"
              className="button"
              onClick={commentsHandle}
            >
              {commentsVisibility ? 'Hide ' : 'Show '}
              {comments.length}
              {comments.length === 1
                ? ` comment`
                : ` comments`
              }
            </button>
          )
        }

        {commentsVisibility
          && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => deleteSelectedComment(comment.id)}
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
          <NewCommentForm
            postId={selectedPostId}
            addComment={addComment}
            comments={comments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
