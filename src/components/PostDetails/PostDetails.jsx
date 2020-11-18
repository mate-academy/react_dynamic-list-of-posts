import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { CommentsList } from '../CommentsList/CommentsList';
import { getPostComments } from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState(null);
  const [isCommentsShown, toggleCommentsVisibility] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPostDetails();
    updateComments();
  }, [postId]);

  const loadPostDetails = async() => {
    try {
      const postDetailsFromServer = await getPostDetails(postId);

      setPostDetails(postDetailsFromServer);
    } catch {
      setError('Oops... Reload the page');
    }
  };

  const updateComments = async() => {
    try {
      const commentsFromserver = await getPostComments(postId);

      setComments(commentsFromserver);
    } catch {
      setError('Oops... Reload the page');
    }
  };

  return error ? (
    <div>{error}</div>
  ) : (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {postDetails.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        {comments
          ? (
            <>
              {!!comments.length && (
                <button
                  type="button"
                  className={classNames({
                    button: true,
                  })}
                  onClick={() => toggleCommentsVisibility(!isCommentsShown)}
                >
                  {`${isCommentsShown
                    ? 'Hide'
                    : 'Show'} ${comments.length} comments`}
                </button>
              )}

              {isCommentsShown && (
                <CommentsList
                  comments={comments}
                  updateComments={updateComments}
                />
              )}
            </>
          )
          : (<p>Loading comments...</p>)
        }
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
