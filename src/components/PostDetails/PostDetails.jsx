import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { CommentsList } from '../CommentsList/CommentsList';
import { getPostComments } from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [isCommentsShown, toggleCommentsVisibility] = useState(false);

  useEffect(() => {
    loadPostDetails();
    updateComments();
  }, [postId]);

  const loadPostDetails = async() => {
    const postDetailsFromServer = await getPostDetails(postId);

    setPostDetails(postDetailsFromServer);
  };

  const updateComments = async() => {
    const commentsFromserver = await getPostComments(postId);

    setComments(commentsFromserver);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {postDetails.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => toggleCommentsVisibility(!isCommentsShown)}
        >
          {`${isCommentsShown ? 'Hide' : 'Show'} ${comments.length} comments`}
        </button>

        {isCommentsShown && (
          <CommentsList comments={comments} updateComments={updateComments} />
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={postId} updateComments={updateComments} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
