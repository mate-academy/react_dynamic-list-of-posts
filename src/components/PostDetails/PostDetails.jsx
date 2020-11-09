import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';
import './PostDetails.scss';
import { Comments } from '../Comments/Comments';

export const PostDetails = React.memo(({ currentPostId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  useEffect(() => {
    loadPostDetails();
    loadPostComments();
  }, [currentPostId]);

  const loadPostDetails = async() => {
    const postDetailsFromApi = await getPostDetails(currentPostId);

    setPostDetails(postDetailsFromApi);
  };

  const loadPostComments = async() => {
    const commentsFromApi = await getPostComments(currentPostId);

    setComments(commentsFromApi);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length ? (
          <button
            type="button"
            className="button"
            onClick={() => setIsCommentsVisible(!isCommentsVisible)}
          >
            {`${isCommentsVisible ? (
              'Hide'
            ) : (
              'Show'
            )} ${comments.length} comments`}
          </button>
        ) : (
          <h4>No Comments yet</h4>
        )}

        {isCommentsVisible && (
          <Comments
            comments={comments}
            loadPostComments={loadPostComments}
          />
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            currentPostId={currentPostId}
            loadPostComments={loadPostComments}
          />
        </div>
      </section>
    </div>
  );
});

PostDetails.propTypes = {
  currentPostId: PropTypes.number.isRequired,
};
