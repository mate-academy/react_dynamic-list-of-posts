import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getPostComments,
  removeComment,
  addNewComment,
} from '../../api/comments';

import { Comments } from '../Comments';

import { NewCommentForm } from '../NewCommentForm';

import './Popup.scss';

const setButtonTitle = (commentsLength, isOpen) => {
  if (!commentsLength) {
    return 'No Comments';
  }

  return isOpen ? 'Hide Comments' : 'Show Comments';
};

export const Popup = ({
  post,
  postAuthor,
  callBack,
}) => {
  const {
    name,
    address: { city, street, suite, zipcode },
    image: authorImage,
    phone,
    email,
  } = postAuthor;

  const {
    id: postId,
    title,
    image: postImage,
    body,
  } = post;

  const [comments, setComents] = useState([]);

  const [idCommentRemove, setIdCommentRemove] = useState(null);
  const [newComment, setNewComment] = useState(null);

  const [commentsVisibility, setCommentsVisibility] = useState(false);

  useEffect(() => {
    if (!idCommentRemove) {
      getPostComments(postId).then(setComents);

      return;
    }

    removeComment(idCommentRemove);
    getPostComments(postId).then(setComents);
    setIdCommentRemove(null);
  }, [idCommentRemove]);

  useEffect(() => {
    addNewComment(newComment);
    getPostComments(postId).then(setComents);

    setNewComment(null);
  }, [newComment]);

  return (
    <>
      <div className="popup__content">
        <button
          className="button button__close"
          type="button"
          onClick={() => callBack({})}
        >
          X
        </button>
        <div className="popup__header">
          <img src={postImage} alt="post-logo" />
        </div>

        <div className="popup__info-block person">

          <img
            src={authorImage}
            alt="person-avatar"
            className="person__image"
          />

          <div className="person__about">
            <span className="person__name">
              {name}
            </span>
            <span>
              {`${street} ${suite}`}
              <br />
              {`${city} ${zipcode}`}
            </span>
            <span>
              {phone}
            </span>
            <span>
              {email}
            </span>

          </div>
        </div>

        <div className="person__post">
          <span className="person__post__title">
            {title}
          </span>
          <div className="person__post__text">
            &ldquo;
            {' '}
            {body}
            {' '}
            &bdquo;
          </div>

          {commentsVisibility
            && (
              <Comments
                comments={comments}
                callBack={setIdCommentRemove}
              />
            )
          }

          <div className="feedback">
            <NewCommentForm
              postId={postId}
              callBack={setNewComment}
            />

            <button
              type="button"
              className="button button__toggle"
              disabled={!comments.length}
              onClick={() => {
                setCommentsVisibility(!commentsVisibility);
              }}
            >
              {
                setButtonTitle(comments.length, commentsVisibility)
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Popup.propTypes = {
  post: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  postAuthor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      suite: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  callBack: PropTypes.func.isRequired,
};
