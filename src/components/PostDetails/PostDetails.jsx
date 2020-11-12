import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setDatails] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [hideStatus, setHideStatus] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [details, comments] = await Promise.all(
        [getPostDetails(selectedPostId), getPostComments(selectedPostId)],
      );

      setDatails(details);
      setPostComments(comments);
    }

    fetchData();
  }, []);

  const handleHide = () => {
    setHideStatus(!hideStatus);
  };

  // console.log(postDetails);
  // console.log(postComments);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleHide}
        >
          Hide
          {' '}
          {postComments.length}
          {' '}
          comments
        </button>

        {hideStatus && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
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
        )}
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
}.isRequired;
