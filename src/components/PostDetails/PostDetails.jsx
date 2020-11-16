import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { NewCommentForm } from '../NewCommentForm';
import { CommentsList } from '../CommentsList';
import { getPostDetails } from '../../api/posts';
import './PostDetails.scss';
import { getPostComments } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [isCommentsShown, toggleCommentsVisibility] = useState(false);

  useEffect(() => {
    loadPostDetails();
    loadComments();
  }, [selectedPostId]);

  const loadPostDetails = async() => {
    const postDetailsFromServer = await getPostDetails(selectedPostId);

    setPostDetails(postDetailsFromServer);
  };

  const loadComments = async() => {
    const commentsFromServer = await getPostComments(selectedPostId);

    setComments(commentsFromServer);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length
          ? (
            <button
              type="button"
              className={cn({
                button: true,
                'PostDetails__remove-button': isCommentsShown,
              })}
              onClick={() => toggleCommentsVisibility(!isCommentsShown)}
            >
              {`${isCommentsShown
                ? 'Hide'
                : 'Show'} ${comments.length} comments`}
            </button>
          )
          : (<p>No comments here yet</p>)
        }

        {isCommentsShown && (
          <CommentsList comments={comments} updateComments={loadComments} />
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            updateComments={loadComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
