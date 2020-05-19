import React from 'react';
import { PostListItem } from './PostListItem';

type Props = {
  postList: FullPostList[];
};

export const PostList: React.FC<Props> = ({ postList }) => {
  return (
    <ul className="post-list">
      {(
        postList.map((item: FullPostList) => {
          const {
            id,
            comments,
            body,
            title,
          } = item;

          const {
            name,
            email,
            address,
          } = item.user;

          return (
            <PostListItem
              key={id}
              comments={comments}
              body={body}
              title={title}
              username={name}
              email={email}
              address={address}
            />
          );
        }))}
    </ul>
  );
};
