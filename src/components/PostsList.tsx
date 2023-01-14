import React from 'react';
import { PostItem } from './PostItem';

import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPostId: number;
  onSelectPostId: React.Dispatch<React.SetStateAction<number>>;
  onCloseNewCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onSelectPostId,
  onCloseNewCommentForm,
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
          {posts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              selectedPostId={selectedPostId}
              onSelectPostId={onSelectPostId}
              onCloseNewCommentForm={onCloseNewCommentForm}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
