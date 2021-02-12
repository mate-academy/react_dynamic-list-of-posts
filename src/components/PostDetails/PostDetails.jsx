/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Loader } from '../Loader/Loader';
import { getComments, deletePostComment, addPostComment } from '../../api/api';
import { usePrevious } from 'react-hanger';

export const PostDetails = ({ post }) => {
  const [commentsList, setCommentsList] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const prevPostId = usePrevious(post.id);

  const loadComments = () => {
    getComments(post.id)
      .then(comments => { setCommentsList(comments) });
  }

  useEffect(() => {
    loadComments();
  }, [post.id]);

  useEffect(() => {
    if (prevPostId !== post.id) {
      loadComments();
    }
  })

  const getNewComment = (newComment) => {
    addPostComment(newComment, post.id)
    loadComments();
  };

  const hide = () => {
    setShowComments(false);
  };

  const show = () => {
    setShowComments(true);
  };

  return (
    <>
      {!post ? (
        <Loader />
      ) : (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.title}</p>
          </section>

          <section className="PostDetails__comments">
            {showComments ? (
              <button
                onClick={hide}
                type="button" className="button">Hide {commentsList.length} comments
              </button>
            ) : (
              <button
                onClick={show}
                type="button" className="button">Show {commentsList.length} comments
              </button>
            )}
            {showComments ? (
              <ul className="PostDetails__list">
                {commentsList.map(com => (
                  <li className="PostDetails__list-item" key={com.id}>
                    <button
                      onClick={() => {
                        deletePostComment(com.id)
                          .then(loadComments)
                      }}
                      type="button"
                      className="PostDetails__remove-button button"
                    >
                      X
                    </button>
                      <p>{com.body}</p>
                  </li>
                ))}
              </ul>
            ) : ''}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                getNewComment={getNewComment}
                loadData={loadComments}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};
