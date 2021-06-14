import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, removeComment } from '../../api/comments';
import { Loader } from '../Loader';

import './PostDetails.scss';

export const PostDetails = ({ postId, isLoading, setLoading }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsVisibility, setCommentsVisibility] = useState(true);

  useEffect(() => {
    getPostDetails(postId)
      .then(result => setPost(result));

    getPostComments(postId)
      .then((result) => {
        setComments(result);
        setLoading(false);
      });
  }, [postId]);

  const changeCommentsVisibility = () => {
    setCommentsVisibility(!commentsVisibility);
  };

  const handleClick = async(event) => {
    await removeComment(event.target.value);

    getPostComments(postId)
      .then(result => setComments(result));
  };

  const printCommentDetails = (date, userName) => {
    const time = new Date(date).toLocaleTimeString();
    const dateString = new Date(date).toLocaleDateString();

    return `${dateString} at ${time} | ${userName} says: `;
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      {!isLoading ? (
        <section className="PostDetails__comments">
          {comments.length > 0 ? (
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
                {comments.map(
                  ({ id, body, createdAt, name }) => commentsVisibility && (
                  <li className="PostDetails__list-item" key={id}>
                    <div className="PostDetails__comment-description">
                      <button
                        type="button"
                        value={id}
                        className="PostDetails__remove-button button"
                        onClick={handleClick}
                      >
                        X
                      </button>

                      <pre>
                        {printCommentDetails(createdAt, name)}
                      </pre>
                    </div>

                    <p>
                      {`${body}`}
                    </p>
                  </li>
                  ),
                )}
              </ul>
            </>
          ) : (
            <div className="PostDetails__no-comments">
              There are no comments yet
            </div>
          )}
        </section>
      ) : <Loader />}

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
  setLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
