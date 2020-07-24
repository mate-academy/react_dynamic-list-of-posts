import React from 'react';
import { PostItem } from './PostItem';
import './PostList.css';

type Props = {
  list: PreparedProps[];
};

export const PostList: React.FC<Props> = ({ list }) => (
  <ul className="post__list">
    {list.map(item => (
      <PostItem
        key={item.id}
        title={item.title}
        body={item.body}
        user={item.user}
        comments={item.comments}
      />
    ))}
  </ul>
);
