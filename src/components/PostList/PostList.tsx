import React, { FC } from 'react';

import './PostList.css';
import { Post } from '../Post/Post';


interface Props {
  postList: PostWithComments[];
}

export const PostList: FC<Props> = ({ postList }) => (
  <ul className="postList">
    {postList.map((post) => {
      const {
        user, comments, id, title, body,
      } = post;

      return (
        <Post
          key={id}
          title={title}
          body={body}
          user={user}
          comments={comments}
        />
      );
    })}
  </ul>
);

