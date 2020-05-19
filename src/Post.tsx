import React from 'react';
import User from './User';

type Props = {
  post: PostProps;
};

const Post: React.FC<Props> = ({ post }) => (
  <>
    <ul className="list">
      <li className="list__userInfo">
        <h3 className="title">{post.title}</h3>
        <p className="body">{post.body}</p>
        <User author={post.author} comments={post.comments} />
      </li>
    </ul>
  </>
);

export default Post;
