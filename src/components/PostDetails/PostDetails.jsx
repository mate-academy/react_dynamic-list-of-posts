/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useEffect, useState, useContext } from 'react';
import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails, getPostComments } from '../../api/posts';
import { remove } from '../../api/api';
import { AppContext } from '../../AppContext';

export const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [isShownComments, setIsShownComments] = useState(true);
  const { selectedPostId } = useContext(AppContext);

  useEffect(() => {
    if (selectedPostId) {
      getPostDetails(selectedPostId).then((res) => setPost(res));
    }

    getPostComments(selectedPostId).then((res) => {
      setComments(res);
    });
  }, [selectedPostId]);

  const deleteComment = (id) => {
    remove(`comments/${id}`).then(() => {
      getPostComments(selectedPostId).then((res) => {
        setComments(res);
      });
    });
  };

  return (
    <div className="PostDetails">
      {selectedPostId && post ? (
        <>
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setIsShownComments((current) => !current)}
            >
              {isShownComments ? 'Hide comments' : 'Show comments'}
            </button>
            {isShownComments && (
              <ul className="PostDetails__list">
                {comments.length > 0
                  ? comments.map((item) => (
                      <li className="PostDetails__list-item" key={item.id}>
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => deleteComment(item.id)}
                        >
                          X
                        </button>
                        <p>{item.body}</p>
                      </li>
                    ))
                  : 'No comments'}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                selectedPostId={selectedPostId}
                setComments={setComments}
              />
            </div>
          </section>
        </>
      ) : (
        'Select post'
      )}
    </div>
  );
};
