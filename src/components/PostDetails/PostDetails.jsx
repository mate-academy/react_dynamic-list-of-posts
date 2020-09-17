import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';

import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [comments, setComments] = useState([]);
  const [isCommentsHidden, setIsCommentsHidden] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then((post) => {
        setTitle(post.title);
        setBody(post.body);
      });

    getPostComments(selectedPostId)
      .then(setComments);

    setIsCommentsHidden(false);
  }, [selectedPostId]);

  const handleClick = () => {
    setIsCommentsHidden(!isCommentsHidden);
  };

  const handleDelete = async(id) => {
    await deleteComment(id);
    getPostComments(selectedPostId)
      .then(setComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <h4>{title}</h4>
        <p>{body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={handleClick}
          >
            {isCommentsHidden ? `Hide ` : 'Show '}
            comments
          </button>
        )}

        <ul className="PostDetails__list">
          {isCommentsHidden && comments.map(comment => (
            <li key={comment.id} className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => handleDelete(comment.id)}
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
