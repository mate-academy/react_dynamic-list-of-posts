import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import {
  getComments,
  delCommentFromServer,
  pushCommentToServer,
} from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    getPostDetails(postId)
      .then((postDetailsFromServer) => {
        setPostDetails(postDetailsFromServer);
      });

    getComments(postId)
      .then((postCommentsFromServer) => {
        setPostComments(postCommentsFromServer);
      });
  }, [postId]);

  const deleteComment = (commentId) => {
    delCommentFromServer(commentId)
      .then (() => {
        getComments(postId)
        .then((postCommentsFromServer) => {
          console.log(postCommentsFromServer);
          setPostComments(postCommentsFromServer);
        });
      })
  };

  const addComment = (newComment) => {
    pushCommentToServer(newComment)
      .then (() => {
        getComments(postId)
        .then((postCommentsFromServer) => {
          setPostComments(postCommentsFromServer);
        });
      })

  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          {showComments
            ? `Hide ${postComments.length} comments`
            : `Show ${postComments.length} comments`}
        </button>
        {showComments ? (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id || Math.random()}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="PostDetails__list" />
        )}

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            addComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
