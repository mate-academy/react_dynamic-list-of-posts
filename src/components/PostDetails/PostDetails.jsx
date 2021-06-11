import React, { useEffect, useState } from 'react';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import PropTypes from 'prop-types';

import { getPostDetails } from '../../api/posts';
import {
  getPostComments,
  removeComment,
  creatComment,
} from '../../api/coments';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState(null);
  const [comments, setCommnets] = useState([]);
  const [visibilCommnet, setVisibilComment] = useState(false);

  const loadComments = () => {
    getPostComments(selectedPostId)
      .then(setCommnets);
  };

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(setPost);
  }, [selectedPostId]);

  useEffect(() => {
    loadComments();
  }, [selectedPostId]);

  const deleteComment = (id) => {
    removeComment(id);
    loadComments();
  };

  const addComment = (body) => {
    creatComment(body);
    loadComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {selectedPostId ? (
        <>
          <section className="PostDetails__post">
            <p>
              {post ? (
                post.body
              ) : (
                'Loading...'
              )}
            </p>
          </section>

          {comments.length === 0 ? (
            'There is no comments yeat'
          ) : (
            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => setVisibilComment(!visibilCommnet)}
              >
                {visibilCommnet ? 'Show comments' : 'Hide commnets'}
              </button>
            </section>
          )}

          {!visibilCommnet && (
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
                  <p>
                    {comment.name}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                onAdd={addComment}
                selectedPostId={selectedPostId}
              />
            </div>
          </section>
        </>
      ) : (
        <>
          <p>
            Please select a post)
          </p>
        </>
      )}
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
