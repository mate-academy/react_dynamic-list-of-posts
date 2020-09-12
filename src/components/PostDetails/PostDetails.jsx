import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, removeComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isHidden, hide] = useState(false);

  useEffect(() => {
    getPostDetails(postId)
      .then(data => setPost(data));

    getPostComments(postId)
      .then(data => setComments(data));
  }, [postId, comments]);

  return (
    <div className="PostDetails">
      <h2>{`Post #${post.id} details:`}</h2>

      <section className="PostDetails__post">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => hide(!isHidden)}
        >
          {`${isHidden ? 'Show' : 'Hide'} comments`}
        </button>

        <ul
          className="PostDetails__list"
          hidden={isHidden}
        >
          {comments.map(({ id, body }) => (
            <li className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => removeComment(id)}
              >
                X
              </button>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={postId} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
