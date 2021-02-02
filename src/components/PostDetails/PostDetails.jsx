import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  addComment, deleteComment, getCommentsForPost,
} from '../../api/comments';

export const PostDetails = ({
  postLoadingFailed,
  id,
  body,
}) => {
  const [comments, setComments] = useState([]);
  const [
    commentsLoadingFailed,
    setCommentsLoadingFailed,
  ] = useState(false);
  const [areCommentsHidden, setAreCommentsHidden] = useState(false);

  async function fetchComments() {
    try {
      await getCommentsForPost(id).then((commentsFromServer) => {
        setComments(commentsFromServer);
      });
    } catch (error) {
      setCommentsLoadingFailed(true);
    }
  }

  useEffect(() => {
    fetchComments();

    return () => setComments([]);
  }, [id]);

  const removeComment = (commentId) => {
    deleteComment(commentId);
    setComments(commentsArr => commentsArr
      .filter(comment => comment.id !== commentId));
  };

  const publishComment = async(comment) => {
    await addComment(comment);
    fetchComments();
  };

  const toggleComments = () => {
    setAreCommentsHidden(currentState => !currentState);
  };

  return (
    <div className="PostDetails">
      {postLoadingFailed
        ? (
          <span className="PostDetails__post">
            Post loading failed
          </span>
        )
        : (
          <>
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>
                {body}
              </p>
            </section>

            {commentsLoadingFailed && (
              <div>Failed to load comments</div>
            )}

            <section className="PostDetails__comments">
              {!!comments.length && (
                <button
                  type="button"
                  className="button"
                  onClick={toggleComments}
                >
                  {areCommentsHidden
                    ? 'Show '
                    : 'Hide '
                  }
                  {`${comments.length} comments`}
                </button>
              )}

              {!areCommentsHidden && (
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <li
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => {
                          removeComment(comment.id);
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
                  postId={id}
                  onCommentSubmit={publishComment}
                />
              </div>
            </section>
          </>
        )
      }
    </div>
  );
};

PostDetails.propTypes = {
  postLoadingFailed: PropTypes.bool.isRequired,
  id: PropTypes.number,
  body: PropTypes.string,
};

PostDetails.defaultProps = {
  id: 0,
  body: '',
};
