import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import * as commentsApi from '../../api/comments';
import * as postApi from '../../api/posts';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [commentsVisibility, setVisible] = useState(false);

  useEffect(() => {
    postApi.getPostDetails(postId)
      .then(setPost);
    commentsApi.getPostComments(postId)
      .then(setComments);
  }, [postId]);

  const deleteComment = (id) => {
    commentsApi.removeComment(id)
      .then(commentsApi.getPostComments(postId))
      .then(setComments);
  };

  return (
    <div className="PostDetails">
      {post && (
        <>
          <h2>{post.title}</h2>

          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setVisible(!commentsVisibility)}
            >
              {commentsVisibility
                ? `Hide ${comments.length} comments`
                : `Show ${comments.length} comments`
              }
            </button>

            {commentsVisibility && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.name}</p>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
