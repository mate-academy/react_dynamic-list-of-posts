import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';

import './PostDetails.scss';

import { getPostComments, deleteComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';

export const PostDetails = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postDetails, setPostDetails] = useState(0);
  const [commentsHidden, setCommentsHidden] = useState(false);

  useEffect(() => {
    getPostComments(postId)
      .then(setComments);

    getPostDetails(postId)
      .then((post) => {
        setPostDetails(post.body);
        setPostTitle(post.title);
      });
  }, [postId]);

  const hide = () => {
    setCommentsHidden(!commentsHidden);
  };

  const handleDelete = async(id) => {
    await deleteComment(id);
    getPostComments(postId)
      .then(setComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <h3>{postTitle}</h3>
        <p>{postDetails}</p>
      </section>

      {(comments.length > 0) && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={hide}
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
                    onClick={() => handleDelete(comment.id)}
                  >
                    X
                  </button>
                  <p>
                    <i>{comment.name}</i>
                  </p>
                  <p>
                    {comment.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
