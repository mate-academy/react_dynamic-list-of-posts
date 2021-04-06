import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getPostDetails } from '../../api/posts';
import { getPostComments,
  pushPostComments, deletePostComments } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader/Loader';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postsDetails, setDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [toggleButton, setToggleButton] = useState(false);

  const grabUpdatedInfo = (newComment) => {
    pushPostComments(newComment)
      .then(getComments);
  };

  const getComments = async() => {
    const response = await getPostComments();
    const filterData = response
      .filter(item => (item.postId === selectedPostId));

    setComments(filterData);
  };

  useEffect(() => {
    const getDetails = async() => {
      const response = await getPostDetails(selectedPostId);

      setDetails(response.data);
    };

    getDetails();
    setComments([]);
  }, [selectedPostId]);

  useEffect(() => {
    getComments();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {postsDetails.length < 1 ? (
        <Loader />
      ) : (
        <>
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
            {comments.length < 1 ? (
              <Loader />
            ) : (
              <>
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
              </>
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
        </>
      )}

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

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
