import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../posts/posts';
import { removeComment, getComments } from '../../comments/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPost }) => {
  const [post, setPost] = useState(null);
  const [commentsVisibility, setCommentsVisibility] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostDetails(selectedPost)
      .then(setPost);

    getComments(selectedPost)
      .then(setComments);
  }, [selectedPost]);

  const deleteComment = (id) => {
    removeComment(id)
      .then(() => getComments(selectedPost)
        .then(setComments));
  };

  return (
    <div className="PostDetails">
      {post
        ? (
          <>
            <section className="PostDetails__post">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </section>

            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => setCommentsVisibility(!commentsVisibility)}
              >
                {commentsVisibility
                  ? `Hide ${comments.length} comments`
                  : `Show ${comments.length} comments`}
              </button>

              {commentsVisibility && (
                <ul className="PostDetails__list">
                  {comments.map(({ id, email, body }) => (
                    <li
                      className="PostDetails__list-item"
                      key={id}
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => deleteComment(id)}
                      >
                        X
                      </button>
                      <span>{`${email}:`}</span>
                      <p>{body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  selectedPost={selectedPost}
                  setComments={setComments}
                />
              </div>
            </section>
          </>
        ) : null}
    </div>
  );
};

PostDetails.propTypes = {
  selectedPost: PropTypes.number.isRequired,
};
