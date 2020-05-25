import React from 'react';
import CommentsList from '../CommentsList/CommentsList';
import UserItem from '../User/User';
import './Post.css';
import { Post } from '../../helpers/api';

const PostItem: React.FC<Post> = ({
  title,
  body,
  user,
  comments,
}) => (
  <div className="post__element">

    <div className="post__item">
      <h3 className="post__title">
        {title}
      </h3>
      <p className="post__body">
        {body}
      </p>
    </div>

    {user ? (
      <UserItem {...user} />
    ) : (
      ''
    )}

    {comments ? (
      <CommentsList comments={comments} />
    ) : (
      ''
    )}

  </div>
);

export default PostItem;
