import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts'
import './PostDetails.scss';
import { post } from '../../api/api';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState();

  useEffect(() => {
    loadPostDetails();

  }, [selectedPostId])

  const loadPostDetails = async() => {
    const postDetailsFromServer = await getPostDetails(selectedPostId);

    setPostDetails(postDetailsFromServer);
  };

  console.log(postDetails);
  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button type="button" className="button">Hide 2 comments</button>

        <ul className="PostDetails__list">
          <li className="PostDetails__list-item">
            <button
              type="button"
              className="PostDetails__remove-button button"
            >
              X
            </button>
            <p>My first comment</p>
          </li>

          <li className="PostDetails__list-item">
            <button
              type="button"
              className="PostDetails__remove-button button"
            >
              X
            </button>
            <p>sad sds dfsadf asdf asdf</p>
          </li>
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  )
};
