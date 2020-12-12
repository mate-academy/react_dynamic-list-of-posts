import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';
import { Loader } from '../Loader';

export const PostDetails = ({ postId, loader }) => {
  const [details, setDetails] = useState({});
  const [comments, setComments] = useState(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    getPostDetails(postId).then(res => setDetails(res));
    getPostComments(postId).then(res => setComments(res));
  }, [postId]);

  return loader ? <Loader /> : (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <h3>{details.title}</h3>

      <section className="PostDetails__post">
        <p>{details.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments && (
          <button
            type="button"
            className={classNames('button', { visible: comments.length > 0 })}
            onClick={() => setHidden(!hidden)}
          >
            {`${!hidden ? 'Show' : 'Hide'} ${comments.length} comments`}
          </button>
        )}
        <ul className="PostDetails__list">
          {hidden && comments.map(comment => (
            <li className="PostDetails__list-item" key={comment.id}>
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => {
                  deleteComment(comment.id);
                  setComments(comments.filter(com => com.id !== comment.id));
                }}
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
          <NewCommentForm postId={postId} setComments={setComments} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
  loader: PropTypes.bool.isRequired,
};
