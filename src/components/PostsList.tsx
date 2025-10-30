import React from 'react';
import { Post } from '../types/Post';
import PostListItem from './PostListItem';

type Props = {
  posts: Post[];
  onSelectedPostId: (postId: number) => void;
  selectedPostId: number;
  setOpenForm: (openForm: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelectedPostId,
  selectedPostId,
  setOpenForm,
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
            return (
              <PostListItem
                post={post}
                key={post.id}
                onSelectedPostId={onSelectedPostId}
                selectedPostId={selectedPostId}
                setOpenForm={setOpenForm}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
