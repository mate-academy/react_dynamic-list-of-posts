import React, { useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { PostListElement } from './PostListElement';

type Props = {
  postsForUser: Post[];
  user: User;
  setPostSelected: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  postsForUser,
  setPostSelected,
}) => {
  const [isLight, setIsLight] = useState<number | null>(null);

  return (
    <div data-cy="PostsList">
      {postsForUser.length === 0 ? (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      ) : (
        <>
          <p className="title">Posts:</p>

          <table
            className="
              table 
              is-fullwidth 
              is-striped 
              is-hoverable 
              is-narrow
            "
          >
            <thead>
              <tr className="has-background-link-light">
                <th>#</th>
                <th>Title</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {postsForUser.map((post) => (
                <PostListElement
                  post={post}
                  key={post.id}
                  setPostSelected={setPostSelected}
                  isLight={isLight}
                  setIsLight={setIsLight}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
