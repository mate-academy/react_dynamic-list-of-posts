import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  setIsSideBarShown: (isShown: boolean) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
  setIsSideBarShown,
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
          {posts.map(post => {
            const isSelected = selectedPost?.id === post.id;

            return (
              <PostItem
                key={post.id}
                post={post}
                setSelectedPost={setSelectedPost}
                isSelected={isSelected}
                setIsSideBarShown={setIsSideBarShown}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
