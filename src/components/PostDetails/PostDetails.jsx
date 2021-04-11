import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import './PostDetails.scss';

import { removeComment } from '../../api/post';

export const PostDetails = React.memo(
  ({
    selectedPost,
    comments,
    updateComments,
    postTitle,
  }) => {
    const [showComment, isShow] = useState(false);

    const deleteComment = (id) => {
      removeComment(id);

      updateComments(comments.filter(comment => comment.id !== id));
    };

    return (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{postTitle}</p>
        </section>

        {comments.length > 0
          ? (
            <>
              <section className="PostDetails__comments">
                <button
                  type="button"
                  className="button"
                  onClick={(event) => {
                    if (event.target.textContent.includes('Hide')) {
                      isShow(false);

                      return;
                    }

                    isShow(true);
                  }}
                >
                  {showComment ? 'Hide'
                    : 'Show'}
                  {' '}
                  {`${comments.length} comments`}
                </button>

                {showComment && (
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
                            deleteComment(comment.id);
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
                    postId={selectedPost}
                    updateComments={updateComments}
                  />
                </div>
              </section>
            </>
          )
          : <Loader />
        }
      </div>
    );
  },
);

PostDetails.propTypes = PropTypes.shape({
  selectedPost: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    postId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  updateComments: PropTypes.func.isRequired,
  postTitle: PropTypes.string.isRequired,
}).isRequired;
