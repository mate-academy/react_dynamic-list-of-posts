import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPostComments, deletePostComment } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ posts, selectedPostId }) => {
  const [comments, setComments] = useState([]);
  const [hidden, setHidden] = useState(true);
  const selectedPost = posts.find(post => +post.id === selectedPostId);

  useEffect(() => {
    getPostComments(selectedPostId)
      .then(setComments);
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        {selectedPost ? <p>{selectedPost.title}</p> : null}
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          hidden={!comments.length}
          className="button"
          onClick={() => setHidden(!hidden)}
        >
          {hidden ? 'Show' : 'Hide'}
          {' '}
          {comments.length}
          {' '}
          comments
        </button>

        <ul hidden={hidden} className="PostDetails__list">
          {comments.map(comment => (
            <li key={comment.id} className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => {
                  deletePostComment(comment.id)
                    .then(() => getPostComments(selectedPost.id)
                      .then(setComments));
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
          <NewCommentForm
            id={selectedPostId}
            getPostComments={getPostComments}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
