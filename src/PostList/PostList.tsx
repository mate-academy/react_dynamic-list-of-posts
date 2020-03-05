import React, { FC } from 'react';
import { CommentList } from '../CommentList/CommentList';

interface Props {
  listOfPosts: CompletedPost[];
}

export const PostList: FC<Props> = ({ listOfPosts }) => (
  <div>
    {listOfPosts.map(post => (
      <div className="post">
        <p className="user">
          {post.user.name}
        </p>
        <p className="post__title">
          {post.title}
        </p>
        <p className="post__body">
          {post.body}
        </p>
        <CommentList comments={post.comments} />
      </div>
    ))}
  </div>
);
