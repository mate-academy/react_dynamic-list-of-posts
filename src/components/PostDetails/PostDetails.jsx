import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';

import { getPostById } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [hideComments, setHideComments] = useState(false);

  useEffect(() => {
    getPostById(postId).then(setPost);
    getPostComments(postId).then(setComments);
  }, [postId]);

  return (
    <>
      {post && (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.title}</p>
          </section>

          <section className="PostDetails__comments">
            {!!comments.length && (
              <button
                type="button"
                className="button"
                onClick={() => (hideComments
                  ? setHideComments(false)
                  : setHideComments(true))
                }
              >
                {hideComments
                  ? `Show ${comments.length} comments`
                  : `Hide ${comments.length} comments`
                }
              </button>
            )}

            {!hideComments && (
            <ul className="PostDetails__list">
              {comments.map(({ id, body }) => (
                <li className="PostDetails__list-item" key={id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deleteComment(id);
                      getPostComments(postId).then(setComments);
                    }}
                  >
                    X
                  </button>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm postId={postId} setComments={setComments} />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
