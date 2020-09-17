import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [comments, setComments] = useState(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(detail => setSelectedDetail(detail));

    getPostComments(selectedPostId)
      .then(result => setComments(result));
  }, [selectedPostId]);

  const hide = () => {
    setHidden(!hidden);
  };

  return (
    selectedDetail && (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{selectedDetail.body}</p>
        </section>

        <section className="PostDetails__comments">
          {comments.length !== 0 && (
            <button
              type="button"
              className="button"
              onClick={hide}
            >
              {`${hidden ? 'Show' : 'Hide'} ${comments.length} comments`}
            </button>
          )}

          {!hidden && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => (
                      deletePostComment(comment.id)
                        .then(() => getPostComments(selectedPostId))
                        .then(data => setComments(data))
                    )}

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
              selectedPostId={selectedPostId}
              comments={comments}
              setComments={setComments}
            />
          </div>
        </section>
      </div>
    ));
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
