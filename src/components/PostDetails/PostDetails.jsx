import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostDetails.scss';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import { getPostComments, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, changeLoadingStatus] = useState(false);
  const [areCommentsVisible, switchCommentsVisibility] = useState(true);

  useEffect(() => {
    const preparePostDetails = async() => {
      const recievedPostDetails = await getPostDetails(selectedPostId);
      const recievedComments = await getPostComments(selectedPostId);

      setPostDetails(recievedPostDetails);
      setComments(recievedComments);
      changeLoadingStatus(false);
    };

    preparePostDetails();
  }, [selectedPostId, isLoading]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      {
      isLoading
        ? <Loader />
        : (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => switchCommentsVisibility(!areCommentsVisible)}
            >
              {
              `${areCommentsVisible ? 'Hide' : 'Show'} ${comments.length}
              ${comments.length > 1 ? 'comments' : 'comment'}`
              }
            </button>

            {areCommentsVisible && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        removeComment(comment.id);
                        changeLoadingStatus(true);
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
        )
      }

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            changeLoadingStatus={changeLoadingStatus}
            selectedPostId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
