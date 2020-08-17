import React, { FC } from 'react';
import { PreparedPost, Comment } from './interfaces';
import CommentList from './CommentList';

interface Props {
  preparedPost: PreparedPost;
}

const PostList: FC<Props> = ({ preparedPost }) => {
  return (
    <li key={preparedPost.post.id}>
      {preparedPost.post.title}
      {' - '}
      {preparedPost.post.body}
      {' - '}
      {preparedPost.user.name}
      {' '}
      {preparedPost.user.email}
      {' '}
      {preparedPost.user.address.city}
      <ul>
        {preparedPost.comments.map((comment: Comment) => {
          return (
            <CommentList key={comment.id} comment={comment} />
          );
        })}
      </ul>

    </li>
  );
};

export default PostList;
