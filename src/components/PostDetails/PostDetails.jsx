import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [isVisibleComments, setIsVisibleComments] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostDetails(selectedPostId).then(setSelectedPostData);

    getPostComments(selectedPostId)
      .then(setComments);
  }, [selectedPostId]);

  if (!selectedPostData) {
    return '';
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPostData.title}</p>
        <br />
        <p>{selectedPostData.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setIsVisibleComments(!isVisibleComments)}
          >
            {isVisibleComments
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`
            }
          </button>
        )}

        {isVisibleComments && (
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
                    deleteComment(comment.id)
                      .then(() => getPostComments(selectedPostId))
                      .then(setComments);
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
            selectedPostId={selectedPostId}
            comments={comments}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number,
};

PostDetails.defaultProps = {
  selectedPostId: null,
};
