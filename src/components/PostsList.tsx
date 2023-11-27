import React from 'react';
import { PostInt } from '../types/PostInt';
import { Post } from './Post';

type PostsListProps = {
  posts: PostInt[],
  selectedPost: PostInt | undefined,
  setSelectedPost: (newPost: PostInt | undefined) => void,
};

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  selectedPost,
  setSelectedPost,
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
        {posts.map(post => (
          <Post
            post={post}
            key={post.id}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
          />
        ))}
      </tbody>
    </table>
  </div>
);
