import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { addComment, removeComment, getPostComments } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [userPost, setUserPost] = useState(0);
  const [postComments, setPostComments] = useState([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId).then(setUserPost);

    fetchPostComments();
  }, [selectedPostId]);

  const fetchPostComments = () => {
    getPostComments(selectedPostId)
      .then(commentsFromServer => setPostComments(
        commentsFromServer,
      ));
  };

  const deleteSelectedComment = async (commentId) => {
    await removeComment(commentId);

    fetchPostComments()
  };

  const addNewComment = async(commentObj) => {
    await addComment(commentObj);

    fetchPostComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          User #
          {userPost.userId}
        </p>
        <p>{userPost.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setShowComments(!showComments)}
        >
          {
            !showComments ? 'Show ' : 'Hide '
          }
          {postComments.length}
          {' '}
          comments
        </button>
        <br />
        {
          showComments
            ? (
              <ul className="PostDetails__list">
                {
                  postComments
                && postComments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteSelectedComment(comment.id)}
                    >
                      X
                    </button>
                    <p>
                      {comment.body
                        ? comment.body : deleteSelectedComment(comment.id)}
                    </p>
                    <hr />
                    <b className="comment__name">{comment.name}</b>
                  </li>
                ))
                }
              </ul>
            ) : <p>{' '}</p>
        }
      </section>

      <section>
        <br />
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addNewComment={addNewComment}
            postId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
