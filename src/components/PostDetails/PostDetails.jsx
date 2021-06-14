import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PostDetails.scss';

import { getPost } from '../../api/posts';
import { getComments, removeComment, addComment } from '../../api/comments';

import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';

export const PostDetails = ({ selectedId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  useEffect(() => {
    getPost(selectedId)
      .then(result => setPost(result));

    setComments(null);

    getComments(selectedId)
      .then(result => setComments(result));
  }, [selectedId]);

  const deleteComment = (id) => {
    removeComment(id)
      .then(() => {
        setComments(list => list.filter(comment => comment.id !== id));
      });
  };

  const addNewComment = (name, email, body) => {
    const newComment = {
      name,
      email,
      body,
      postId: selectedId,
    };

    addComment(newComment)
      .then((result) => {
        setComments(list => [...list, result]);
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {post ? (
        <>
          <section className="PostDetails__post">
            <p>{post.title}</p>
          </section>

          {comments ? (
            <>
              <section className="PostDetails__comments">
                {comments.length === 0
                  ? 'There are not comments yet'
                  : (
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        setIsCommentVisible(currentStatus => !currentStatus);
                      }}
                    >
                      {isCommentVisible
                        ? `Show ${comments.length} comments`
                        : `Hide ${comments.length} comments`
                      }
                    </button>
                  )}

                {!isCommentVisible && (
                  <ul className="PostDetails__list">
                    {comments.map(comment => (
                      <li className="PostDetails__list-item" key={comment.id}>
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => {
                            deleteComment(comment.id);
                          }}
                        >
                          X
                        </button>
                        <p>{comment.name}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section>
                <div className="PostDetails__form-wrapper">
                  <NewCommentForm onAdd={addNewComment} />
                </div>
              </section>
            </>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <Loader />
      )
      }
    </div>
  );
};

PostDetails.propTypes = {
  selectedId: PropTypes.number.isRequired,
};
