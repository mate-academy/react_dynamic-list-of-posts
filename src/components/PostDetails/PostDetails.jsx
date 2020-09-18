import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, deleteComment, addComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ post }) => {
  const [comments, setPostComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(true);

  useEffect(() => {
    getPostComments(post.id)
      .then(setPostComments);
  }, [post.id]);

  const changeCommentsVisibility = () => {
    setVisibleComments(!visibleComments);
  };

  const onCommentDelete = (commentId) => {
    deleteComment(commentId)
      .then(() => {
        getPostComments(post.id)
          .then(setPostComments);
      });
  };

  const onCommentAdd = (postId, name, body, email) => {
    addComment(postId, name, body, email)
      .then(() => {
        getPostComments(post.id)
          .then(setPostComments);
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button PostDetails__button"
            onClick={() => {
              changeCommentsVisibility();
            }}
          >
            {visibleComments ? `Hide ` : `Show `}
            {`${comments.length}
              ${comments.length > 1 ? 'comments' : 'comment'}`}
          </button>
        )}

        {visibleComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    onCommentDelete(comment.id);
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
          <NewCommentForm
            postId={post.id}
            addComment={onCommentAdd}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
};

PostDetails.defaultProps = {
  post: {},
};
