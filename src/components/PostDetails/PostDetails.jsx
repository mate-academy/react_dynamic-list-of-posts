import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { deleteComment, getComments, postComment } from '../../api/comments';
import { TypePost } from '../../types';

export const PostDetails = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [isVisisble, setVisibility] = useState(true);

  useEffect(() => {
    loadComments(post.id);
  }, [post.id]);

  const loadComments = (postId) => {
    getComments(postId)
      .then((commentsFromServer) => {
        setComments(commentsFromServer);
      });
  };

  const addPostComment = (comment, postId) => {
    postComment(comment, postId)
      .then(() => {
        loadComments(postId);
      });
  };

  const deletePostComment = (commentId, postId) => {
    deleteComment(commentId)
      .then(() => {
        loadComments(postId);
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length === 0 && 'There is no comment to display'}
        {(comments.length > 0 && isVisisble === true) && (
          <>
            <button
              type="button"
              className="button"
              onClick={() => {
                setVisibility(false);
              }}
            >
              Hide
              {' '}
              {comments.length}
              {' '}
              comments
            </button>
            <ul className="PostDetails__list">

              {comments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => deletePostComment(comment.id, post.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        {(comments.length > 0 && isVisisble === false) && (
          <button
            type="button"
            className="button"
            onClick={() => {
              setVisibility(true);
            }}
          >
            Show
            {' '}
            {comments.length}
            {' '}
            comments
          </button>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={post.id} addComment={addPostComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  post: TypePost.isRequired,
};
