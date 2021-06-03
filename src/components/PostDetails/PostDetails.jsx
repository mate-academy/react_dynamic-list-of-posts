import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPost, getCommentsByPost,
  addNewComment, deleteComment } from '../../api/posts';

export const PostDetails = ({ post }) => {
  const [currentPost, setCurrentPost] = useState({});
  const [comments, setComments] = useState([]);
  const [hiddenComments, setHiddenComments] = useState(false);

  const addComment = (comment) => {
    addNewComment({
      postId: post,
      ...comment,
    }).then(() => getCommentsByPost(post).then(setComments));
  };

  const onDelete = async(id) => {
    await deleteComment(id);
    getCommentsByPost(post).then(setComments);
  };

  useEffect(() => {
    getPost(post).then(setCurrentPost);
    getCommentsByPost(post).then(setComments);
  }, [post]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{currentPost.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length !== 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setHiddenComments(!hiddenComments)}
          >
            Hide&nbsp;
            {comments.length}
            &nbsp;comments
          </button>
        )}

        {!hiddenComments && (
        <ul className="PostDetails__list">
          {comments.map(comment => (
            <li
              key={comment.id}
              className="PostDetails__list-item"
            >
              <button
                type="button"
                className="PostDetails__remove-button button"
                value={comment.id}
                onClick={e => onDelete(e.target.value)}
              >
                X
              </button>
              <p>{comment.body}</p>
              <p>{comment.id}</p>
            </li>
          ))}
        </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm onAddComment={addComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.number.isRequired,
};
