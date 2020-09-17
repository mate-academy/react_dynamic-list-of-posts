import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments, deleteComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';

export const PostDetails = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [postDetails, setPostDetails] = useState('');
  const [commentsHidden, setCommentsHidden] = useState(false);

  useEffect(() => {
    getPostComments(postId)
      .then(commentsList => setComments(commentsList));

    getPostDetails(postId)
      .then(post => setPostDetails(post.body));
  }, [postId, comments]);

  const toggleComments = () => {
    setCommentsHidden(!commentsHidden);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails}</p>
      </section>

      {(comments.length > 0) && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={toggleComments}
          >
            {`${commentsHidden ? 'Show' : 'Hide'} ${comments.length} comments`}
          </button>

          {!commentsHidden && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => deleteComment(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm comments={comments} postId={postId} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
