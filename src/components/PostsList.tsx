import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  postsForView: Post[];
  setIsPostOpen: (post: Post | null) => void;
  isPostOpen: Post | null;
};

export const PostsList: React.FC<Props> = ({
  postsForView,
  setIsPostOpen,
  isPostOpen,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {
            postsForView.map(post => (
              <PostItem
                key={post.id}
                post={post}
                isPostOpen={isPostOpen}
                setIsPostOpen={setIsPostOpen}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
