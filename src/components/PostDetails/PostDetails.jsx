import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment, addComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, addPost] = useState([]);
  const [comments, addComments] = useState([]);
  const [areVisible, changeVisibility] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async() => {
      const postfromServer = await getPostDetails(postId);
      const commentsfromServer = await getPostComments(postId);

      addPost(postfromServer);
      addComments(commentsfromServer);
    };

    fetchPostDetails();
  }, [postId]);

  const handleDelete = (commentId) => {
    deleteComment(commentId)
      .then(() => getPostComments(postId))
      .then(result => addComments(result));
  };

  const updateComments = (newComment) => {
    addComment(newComment)
      .then(() => getPostComments(postId))
      .then(result => addComments(result));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </section>

      {comments.length > 0 && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={() => changeVisibility(!areVisible)}
          >
            {`${areVisible ? 'Show' : 'Hide'} ${comments.length} comments`}
          </button>

          {areVisible && (
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
                  <h4>{comment.name}</h4>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={postId} addNewComment={updateComments} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
