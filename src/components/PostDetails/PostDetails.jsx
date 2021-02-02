import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPost } from '../../api/posts';

// eslint-disable-next-line import/extensions
import * as api from '../../api/comments.js';

export const PostDetails = ({ postID }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [hidedComments, setHidedComments] = useState(false);

  useEffect(() => {
    if (postID) {
      loadPost();
      loadCommets();
    }
  }, [postID]);

  const loadPost = async() => {
    const loadedPost = await getPost(postID);

    setPost(loadedPost);
  };

  const loadCommets = async() => {
    const loadedComments = await api.getComments();

    setComments(loadedComments.filter(comment => comment.postId === postID));
  };

  const addComment = (newComment) => {
    api.postComments({
      ...newComment,
      postId: postID,
    }).then(() => loadCommets());
  };

  const deleteComment = (commentId) => {
    api.removeComments(commentId).then(() => loadCommets());
  };

  return (
    <div className="PostDetails">
      <h2>PostDetails</h2>
      <h3>
        User
        {' '}
        {post.userId}
      </h3>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className={classnames({
            button: true,
            'PostDetails__button-active': hidedComments,
          })}
          onClick={() => {
            setHidedComments(!hidedComments);
          }}
        >
          Hide
          {' '}
          {comments.length}
          {' '}
          comments
        </button>

        <ul className="PostDetails__list">
          {!hidedComments && (
            comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  X
                </button>
                <p>
                  {comment.body}
                  <span className="PostDetails__name">{comment.name}</span>
                </p>
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postID: PropTypes.number.isRequired,
};
