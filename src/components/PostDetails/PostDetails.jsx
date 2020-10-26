import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  getPostComments,
  removePostComment,
  addPostComment,
} from '../../api/comments';
import { getPostDetails } from '../../api/posts';

export const PostDetails = ({ postId }) => {
  const [post, addPost] = useState([]);
  const [comments, addComments] = useState([]);
  const [visibleComments, changeVisibleOfComments] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async() => {
      const postfromServer = await getPostDetails(postId);
      const commentsfromServer = await getPostComments(postId);

      addPost(postfromServer);
      addComments(commentsfromServer);
    };

    fetchPostDetails();
  }, [postId]);

  const changeVisible = () => {
    changeVisibleOfComments(!visibleComments);
  };

  const deleteComment = (commentId) => {
    removePostComment(commentId)
      .then(() => getPostComments(postId))
      .then(result => addComments(result));
  };

  const updateComments = (newComment) => {
    addPostComment(newComment)
      .then(() => getPostComments(postId))
      .then(result => addComments(result));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>
      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => changeVisible()}
        >
          {visibleComments ? `Hide` : 'Show'}
          {` ${comments.length} comments`}
        </button>

        {visibleComments && (
          <ul className="PostDetails__list">
            {comments.length > 0 && comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.name}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            createComment={updateComments}
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
