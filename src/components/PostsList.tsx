import React from 'react';
import { Post } from '../types/Post';
import { PostUser } from './PostUser';

type Props = {
  userPosts: Post[],
  activePost: Post | null,
  handleSideBar: (post: Post) => void
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  activePost,
  handleSideBar,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {userPosts.map((postItem) => (
            <PostUser
              key={postItem.id}
              post={postItem}
              activePost={activePost}
              handleSideBar={handleSideBar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
