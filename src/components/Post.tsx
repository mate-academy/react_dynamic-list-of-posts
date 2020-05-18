import React, { useState } from 'react';
import { User } from './User';
import { CommentList } from './CommentList';

type PostProps = {
  post: PreparedPost;
};

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isChecked, toggleChecked] = useState<boolean>(false);

  return (
    <li className="post">
      <div className="post_body">
        <div>
          <div className="avatar" />
          <h3 className="post_title">{post.title}</h3>
          <p className="post_text">{post.body}</p>
        </div>
        <User {...post.user} />
      </div>
      <div className="toggle-comments">
        <label htmlFor="checkbox">
          <i className="toggle-checkbox material-icons">arrow_drop_down</i>
          <input id="checkbox" className="checkbox" type="checkbox" checked={isChecked} onChange={() => toggleChecked(!isChecked)} />
        </label>
      </div>
      {isChecked
        && (<CommentList comments={post.comments} />)}
    </li>
  );
};
