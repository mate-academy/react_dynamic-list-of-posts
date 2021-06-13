import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, removeComment } from '../../api/comments';

import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsVisibility, setCommentsVisibility] = useState(true);

  useEffect(() => {
    getPostDetails(postId)
      .then(result => setPost(result));

    getPostComments(postId)
      .then(result => setComments(result));
  }, [postId]);

  const changeCommentsVisibility = () => {
    setCommentsVisibility(!commentsVisibility);
  };

  const handleClick = async(event) => {
    await removeComment(event.target.value);

    getPostComments(postId)
      .then(result => setComments(result));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <>
            <button
              type="button"
              className="button"
              onClick={changeCommentsVisibility}
            >
              {commentsVisibility
                /* eslint-disable-next-line max-len */
                ? `Hide ${comments.length} comment${comments.length === 1 ? '' : 's'}`
                /* eslint-disable-next-line max-len */
                : `Show ${comments.length} comment${comments.length === 1 ? '' : 's'}`}
            </button>

            <ul className="PostDetails__list">
              {comments.map(comment => commentsVisibility && (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    value={comment.id}
                    className="PostDetails__remove-button button"
                    onClick={handleClick}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={postId} setComments={setComments} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
