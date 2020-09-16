import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getComments, removeComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPost }) => {
  const [post, setPost] = useState(null);
  const [isCommentsVisible, setCommentsVisibility] = useState(false);
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
      {post && (
        <>
          <section className="PostDetails__post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setCommentsVisibility(!isCommentsVisible)}
            >
              {isCommentsVisible
                ? `Hide ${comments.length} comments`
                : `Show ${comments.length} comments`}
            </button>

            {isCommentsVisible && (
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
      )}
    </div>
  );
};

PostDetails.propTypes = {
  selectedPost: PropTypes.number.isRequired,
};
