import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPostDetails, getPostComments, deleteComment } from '../../api/api';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [areCommentsVisible, changeCommentsVisibility] = useState(true);

  useEffect(() => {
    getPostDetails(postId).then(receivedPost => setPost(receivedPost));
    getPostComments(postId).then(
      receivedComments => setComments(receivedComments),
    );
  }, [postId]);

  const commentVisibilityHandler = () => {
    changeCommentsVisibility(prevValue => !prevValue);
  };

  const commentDeleteHandler = (commentId) => {
    deleteComment(commentId);

    setComments(prevComments => prevComments.filter(
      comment => comment.id !== commentId,
    ));
  };

  const addComment = (comment) => {
    setComments(prevComments => [...prevComments, comment]);
  };

  return (
    <>
      {post && comments ? (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.title}</p>
          </section>

          <section className="PostDetails__comments">
            {comments.length > 0 && (
              <button
                type="button"
                className="button"
                onClick={commentVisibilityHandler}
              >
                {areCommentsVisible
                  ? `Hide ${comments.length} comments`
                  : `Show ${comments.length} comments`
                }
              </button>
            )}

            <ul className="PostDetails__list">

              {areCommentsVisible && comments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => commentDeleteHandler(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}

            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={postId}
                comments={comments}
                addComment={addComment}
              />
            </div>
          </section>
        </div>
      ) : (
        <>
          Loading...
        </>
      )}
    </>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
