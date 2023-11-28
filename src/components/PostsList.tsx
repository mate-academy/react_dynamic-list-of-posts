import React from 'react';

import { Post } from '../types/Post';
import { Button } from './Button';

type Props = {
  userPosts: Post[];
  setSelectedPost: (number: number) => void;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  setSelectedPost,
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
          {userPosts.map(post => {
            return (
              <tr
                data-cy="Post"
                key={post.id}
              >
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <Button
                    post={post}
                    setSelectedPost={setSelectedPost}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
