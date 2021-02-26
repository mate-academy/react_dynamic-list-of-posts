import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { addNewComment, deleteComment, getsComments } from '../../api/comments';
import { getPost } from '../../api/posts';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    getPost(postId).then(setPost);
    getsComments(postId).then(setComments);
  }, [postId]);

  const addComment = (name, email, body) => {
    addNewComment(postId, name, email, body)
      .then(() => getsComments(postId))
      .then(setComments);
  };

  if (!post) {
    return <p>Select the post</p>;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 ? (
          <button
            type="button"
            className="button"
            onClick={() => setVisibility(!visibility)}
          >
            {visibility ? (
              `Hide comments`
            ) : (
              `Show ${comments.length} comments`
            )}
          </button>
        ) : (
          <p>This post has no comments</p>
        )}
        {visibility && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.body}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(comment.id)
                      .then(() => getsComments(postId))
                      .then(setComments);
                  }}
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
          <NewCommentForm postId={postId} addComment={addComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
