import React, { useContext } from 'react';

import { Button } from './Button';
import { AppContext } from './Context';

type Props = {};

export const PostsList: React.FC<Props> = () => {
  const appContext = useContext(AppContext);

  const { userPosts } = appContext;

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
                  <Button post={post} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
