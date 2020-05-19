import React from 'react';
import { PostListItem } from './PostListItem';

type Props = {
  list: FullList[];
};

export const PostList: React.FC<Props> = ({ list }) => {
  return (
    <ul className="post-list">
      {(
        list.map((item: FullList) => (
          <PostListItem
            key={item.id}
            comments={item.comments}
            body={item.body}
            title={item.title}
            username={item.user.name}
            email={item.user.email}
            address={item.user.address}
          />
        )))}
    </ul>
  );
};
