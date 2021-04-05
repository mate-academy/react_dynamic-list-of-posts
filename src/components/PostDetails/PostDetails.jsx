import React, { useState, useEffect } from 'react';
import { getPostDetails } from '../../api/posts';
import { getPostComments, pushPostComments, deletePostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postsDetails, setDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [toggleButton, setToggleButton] = useState(false);

  const getDetails = async() => {
    const response = await getPostDetails(selectedPostId);

    setDetails(response.data);
  };

  const getComments = async() => {
    const response = await getPostComments();
    const filterData = response
      .filter(item => (item.postId === selectedPostId));

    setComments(filterData);
  };

  const grabUpdatedInfo = (newComment) => {
    pushPostComments(newComment)
      .then(getComments);
  };

  useEffect(() => {
    getDetails();
  }, [selectedPostId]);

  useEffect(() => {
    getComments();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {postsDetails.title}
        </p>
        <h3>Body</h3>
        <p>
          {postsDetails.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        {toggleButton ? (
          <button
            type="button"
            className="button"
            onClick={() => setToggleButton(false)}
          >
            {`Hide ${comments.length} comments`}
          </button>
        ) : (
          <button
            type="button"
            className="button"
            onClick={() => setToggleButton(true)}
          >
            {`Show ${comments.length} comments`}
          </button>
        )}

        {toggleButton && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deletePostComments(comment.id)
                      .then(getComments);
                  }}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            grabUpdatedInfo={grabUpdatedInfo}
          />
        </div>
      </section>
    </div>
  );
};
