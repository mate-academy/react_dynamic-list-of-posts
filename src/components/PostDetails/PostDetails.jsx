import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Loader } from '../Loader';
import { getPostDetails } from '../../api/posts';
import { getPostComments, addComment, removeComment } from '../../api/comments';
import { ButtonShowHide } from '../ButtonShowHide';

export const PostDetails = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [isShowedComments, setIsShowedComments] = useState(false);
  const [newComment, setNewComment] = useState(null);
  const [commentId, setCommentId] = useState(0);

  const getNewComment = (newCommentFromForm) => {
    setNewComment(newCommentFromForm);
  };

  const getCommentId = (commentIdClick) => {
    setCommentId(commentIdClick);
  };

  useEffect(() => {
    getPostDetails(postId)
      .then((postFromServer) => {
        setPost(postFromServer);
      });

    getPostComments(postId)
      .then((commentsFromServer) => {
        setComments(commentsFromServer);
      });

    addComment(newComment)
      .then();

    removeComment(commentId)
      .then();
  }, [postId, comments, post, newComment, commentId]);

  const isShowedCommentsOnClick = (bool) => {
    setIsShowedComments(bool);
  };

  return (
    <>
      {!post ? (
        <Loader />
      ) : (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>

          {!!comments.length && (
            <section className="PostDetails__comments">
              <ButtonShowHide
                commentsLength={comments.length}
                isShowedCommentsOnClick={isShowedCommentsOnClick}
              />
              {isShowedComments && (
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <li
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => getCommentId(comment.id)}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={postId}
                getNewComment={getNewComment}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
