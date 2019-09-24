import React from 'react';
import User from '../User/User';
import { PostItemProps } from '../../constants/proptypes';
import CommentList from '../CommentList/CommentList';

import './Post.css';

const PostItem = ({ post }) => {
  const {
    title, body, user, comments,
  } = post;

  const { name, email, address } = user;

  return (
    <>
      <div className="content card-item">
        <div className="header">{title}</div>
        <User name={name} email={email} address={address} />
        <div className="description">{body}</div>
      </div>
      <div className="extra content">
        <span>Comments:</span>
        <CommentList comments={comments} />
      </div>
    </>
  );
};

PostItem.propTypes = PostItemProps;

export default PostItem;
