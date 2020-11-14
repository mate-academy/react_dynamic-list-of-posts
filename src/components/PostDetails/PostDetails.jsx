/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails, getPostComments } from '../../api/posts';

export const PostDetails = (props) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [isShownComments, setIsShownComments] = useState(true);
  const { selectedPostId } = props;

  useEffect(() => {
    if (selectedPostId) {
      getPostDetails(selectedPostId).then((res) => setPost(res));
    }

    getPostComments(selectedPostId).then((res) => {
      setComments(res);
    });
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      {selectedPostId && post ? (
        <>
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button type="button" className="button">
              Hide comments
            </button>

            <ul className="PostDetails__list">
              {comments.length > 0
                ? comments.map((item) => (
                    <li className="PostDetails__list-item" key={item.id}>
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                      >
                        X
                      </button>
                      <p>{item.body}</p>
                    </li>
                  ))
                : 'No comments'}
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm />
            </div>
          </section>
        </>
      ) : (
        'Select post'
      )}
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
