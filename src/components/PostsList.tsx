import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  getCommentsFromServer: (postId: number) => Promise<void>;
  setIsFormVisible: (value: boolean) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
  getCommentsFromServer,
  setIsFormVisible,
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
          <PostItem
            key={post.id}
            post={post}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
            getCommentsFromServer={getCommentsFromServer}
            setIsFormVisible={setIsFormVisible}
          />
        ))}
      </tbody>
    </table>
  </div>
);
