import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import { PostComments } from '../PostComments';
import './PostDetails.scss';

export const PostDetails = ( { selectedPostId }) => {
  const [details, setDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadDetails();
    updateComments();
  }, [selectedPostId]);

  const loadDetails = async() => {
    const loadedDetails = await getPostDetails(selectedPostId);
    setDetails(loadedDetails);
    setIsVisible(false);
  };

  const updateComments = async() => {
    const postComments = await getPostComments(selectedPostId);
    setComments(postComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{details.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length ? (
            <button
              type="button"
              className="button"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? 'Hide comments' : 'Show comments'}
            </button>
          ) : (
            <h4>No Comments</h4>
        )}

        {isVisible &&
          <PostComments
            comments={comments}
            updateComments={updateComments}
          />
        }

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            updateComments={updateComments}
          />
        </div>
      </section>
    </div>
  );
}

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
