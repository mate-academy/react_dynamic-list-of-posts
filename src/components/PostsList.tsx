import React from 'react';
import { Post } from '../types/Post';
import { PostsListItem } from './PostsListItem';
import { HandlePostSelect } from '../types/handlers';
import { SelectedPostId } from '../types/types';

type Props = {
  posts: Post[];
  selectedPostId: SelectedPostId;
  onPostSelect: HandlePostSelect;
};

export const PostsList = React.memo(
  ({ posts, selectedPostId, onPostSelect }: Props) => (
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
            <PostsListItem
              key={post.id}
              post={post}
              isSelected={post.id === selectedPostId}
              onPostSelect={onPostSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  ),
);

PostsList.displayName = 'PostsList';
