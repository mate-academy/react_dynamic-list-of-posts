import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { removeComment, getPostComments } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ postId, details }) => {
  const [hiddenComments, switchHidden] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    switchHidden(false);
    getPostComments(postId).then(response => setComments(response));
  }, [postId, comments]);

  const deleteComment = (commentId) => {
    removeComment(commentId);
  };

  return (
    <>
      {!details
        ? 'Please choose a post'
        : (
          <div className="PostDetails">
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>{details.title}</p>
            </section>

            {!!comments.length
              && (
                <section className="PostDetails__comments">
                  <button
                    type="button"
                    className="button"
                    onClick={() => {
                      switchHidden(!hiddenComments);
                    }}
                  >
                    {!hiddenComments ? 'Hide ' : 'Show '}
                    {comments.length}
                    {' '}
                    {comments.length === 1 ? 'comment' : 'comments'}
                  </button>

                  <ul className="PostDetails__list">
                    {!hiddenComments
                      && (
                        <>
                          {comments.map(comment => (
                            <li
                              key={comment.id}
                              className="PostDetails__list-item"
                            >
                              <button
                                type="button"
                                className="PostDetails__remove-button button"
                                onClick={() => {
                                  deleteComment(comment.id);
                                }}
                              >
                                X
                              </button>
                              <p>{comment.body}</p>
                            </li>
                          ))}
                        </>
                      )
                    }
                  </ul>
                </section>
              )
            }
            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  postId={details.id}
                />
              </div>
            </section>
          </div>
        )
      }
    </>
  );
};

PostDetails.defaultProps = {
  postId: 0,
  details: {
    title: '',
    id: 0,
  },
};

PostDetails.propTypes = {
  postId: PropTypes.number,
  details: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
  }),
};
