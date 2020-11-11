import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader/Loader';
import { removePostComment } from '../../api/comments';
import { GetPostDetails } from '../../api/posts';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [details, setDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [hiddenComments, setHiddenComments] = useState(true);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    GetPostDetails(selectedPostId)
      .then(setDetails);

    setloading(true);
    GetPostDetails(selectedPostId)
      .then((detail) => {
        setDetails(detail);
        setloading(false);
      });
  }, [selectedPostId]);

  const removeComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    removePostComment(commentId);
  };

  if (!details) {
    return null;
  }

  return (
    <>
      {loading
        ? <Loader />
        : (
          <div className="PostDetails">
            <h2>{details.title}</h2>

            <section className="PostDetails__post">
              <p>{details.body}</p>
            </section>

            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => setHiddenComments(!hiddenComments)}
              >
                {hiddenComments
                  ? `Hide ${comments.length} comments`
                  : `Show ${comments.length} comments`
                }
              </button>

              {hiddenComments && (
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <li
                      className="PostDetails__list-item"
                      key={comment.id}
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => removeComment(comment.id)}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}

                  <li className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                    >
                      X
                    </button>
                  </li>
                </ul>
              )}
            </section>

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  selectedPostId={selectedPostId}
                  setComments={setComments}
                />
              </div>
            </section>
          </div>
        )
      }
    </>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
