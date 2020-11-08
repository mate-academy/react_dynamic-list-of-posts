import React from 'react';
import PropTypes from 'prop-types';
import { PostShape } from '../shapes/PostShape';
import { UserShape } from '../shapes/UserShape';

export const PostInfo = ({ post, user }) => {
  const date = new Date(post.createdAt);
  const displayDate = `
    ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
  `;

  return (
    <section className="PostDetails__post">
      <h4 className="PostDetails__title">{post.title}</h4>

      <div className="PostDetails__info-wrapper">
        <i className="PostDetails__icon fas fa-calendar-minus" />
        <div className="PostDetails__general-info">
          <p>
            <span className="PostDetails__text">Created by</span>
            <span className="blue-text">{user.name}</span>
          </p>
          <p>
            <span className="PostDetails__text">Created at</span>
            <span className="blue-text">{displayDate}</span>
          </p>
        </div>

      </div>
      <p className="PostDetails__body">{post.body}</p>
    </section>
  );
};

PostInfo.propTypes = {
  post: PropTypes.shape(PostShape).isRequired,
  user: PropTypes.shape(UserShape).isRequired,
};
