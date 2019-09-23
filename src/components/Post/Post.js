import React from 'react';

import { PostProps } from '../PropTypes/PropTypes';
import './Post.css';
import CommentList from '../CommentList/CommentList';

const Post = ({ post, commentList }) => {
  const {
    id, title, body, user,
  } = post;

  return (
    <div className="ui card post-info">
      <div className="content">
        <div className="header">
          <p className="post-id">
            {id}
          </p>
          <p className="post-title">
            {title}
          </p>
        </div>
        <div className="description">
          <p>
            {body}
          </p>

          <h1 className="user__name">
            {user.name}
          </h1>
          <p className="user__email">
            {user.email}
          </p>

          <div className="user__address">
            <h3 className="user__title">Address of user</h3>
            <p className="user__street">
              {`Street: ${user.address.street}`}
            </p>
            <p className="user__city">
              {`City: ${user.address.city}`}
            </p>
          </div>

          <CommentList filteredComments={commentList
            .filter(comment => comment.postId === id)}
          />
        </div>
      </div>
    </div>
  );
};

Post.propTypes = PostProps;

export default Post;
