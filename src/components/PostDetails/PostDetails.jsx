import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';

import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState([]);
  // const [commentsVisibility, setCommentsVisibility] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostDetails = async() => {
      const postResponse = await getPostDetails(selectedPostId);
      const commentsResponse = await getPostComments(selectedPostId);

      setSelectedPost(postResponse);
      setComments(commentsResponse);
    };

    fetchPostDetails();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <h3>{selectedPost.title}</h3>
      </section>

      <section className="PostDetails__comments">
        <button type="button" className="button">
          Hide
          {comments.length}
          {' '}
          comments
        </button>
        <ul className="PostDetails__list">

          {comments.map(comment => (

            <li
              className="PostDetails__list-item"
              key={comment.id}
            >
              <button
                type="button"
                className="PostDetails__remove-button button"
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
