import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type PostListProps = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setLoadingComments: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsList: React.FC<PostListProps> = ({
  posts,
  selectedPost,
  setSelectedPost,
  setLoadingComments,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <PostItem
              post={post}
              key={post.id}
              selectedPost={selectedPost}
              setSelectedPost={setSelectedPost}
              setLoadingComments={setLoadingComments}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
