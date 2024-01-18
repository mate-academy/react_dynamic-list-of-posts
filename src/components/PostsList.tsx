import React from 'react';

import { Post } from '../types/Post';
import { PostItem } from './Post';

interface Props {
  posts: Post[],
  showPostDetails: (post: Post) => void,
  openPostId?: number,
}

export const PostsList: React.FC<Props> = ({
  posts,
  showPostDetails,
  openPostId,
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
          {posts.map(({
            id, userId, title, body,
          }) => (
            <PostItem
              id={id}
              title={title}
              userId={userId}
              body={body}
              openPostId={openPostId}
              onClick={showPostDetails}
              key={id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
