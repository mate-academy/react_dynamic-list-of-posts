import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './Post/Post';

type Props = {
  userPosts: Post[] | null,
  setSelectedPost: (post: Post | null) => void,
  selectedPost: Post | null,
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  setSelectedPost,
  selectedPost,
}) => (
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
        {userPosts?.map(post => (
          <PostItem
            key={post.id}
            post={post}
            setSelectedPost={setSelectedPost}
            selectedPost={selectedPost}
          />
        ))}
      </tbody>
    </table>
  </div>
);
