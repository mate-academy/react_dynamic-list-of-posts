import React from 'react';
import User from '../User/User';
import CommentList from '../CommentList';
import './Post.css';

interface Props {
  post: Post;
}

const Post: React.FC<Props> = ({
  post: {
    title, body, user, userComments,
  },
}) => (
  <div className="post">
    <h3 className="post__title">
      {title}
    </h3>
    <p className="post__body">
      {body}
    </p>
    <User user={user} />
    <CommentList userComments={userComments} />
  </div>
);

export default Post;
