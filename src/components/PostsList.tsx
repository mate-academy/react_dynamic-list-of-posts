import React from 'react';
import { Post as PostUser } from '../types/Post';
import { Post } from './Post';

type Props = {
  userPosts: PostUser[];
  selectedPost: PostUser | null;
  setSelectedPost: (post: PostUser | null) => void;
};
export const PostsList: React.FC<Props> = props => {
  const { userPosts, setSelectedPost, selectedPost } = props;

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
          {userPosts.map(post => (
            <Post
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
};
