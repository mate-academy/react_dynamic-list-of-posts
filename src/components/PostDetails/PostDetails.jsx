import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { deleteComment } from '../../api/comments';

export const PostDetails = ({ post, comments, selectPost }) => {
  const [isVisibleComments, setIsVisibleComments] = useState(true);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
        <br />
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setIsVisibleComments(!isVisibleComments)}
          >
            {isVisibleComments
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`
            }
          </button>
        )}

        {isVisibleComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(comment.id);
                    selectPost(post.id);
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
            currentPost={post}
            selectPost={selectPost}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  selectPost: PropTypes.func.isRequired,
};
