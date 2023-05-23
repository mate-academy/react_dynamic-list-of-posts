import React from 'react';
import classNames from 'classnames';

import { Post } from '../types/Post';

type Props = {
  userPosts: Post[] | null,
  activePost: number | null,
  setActivePost: (param: null | number) => void
};

export const PostsList: React.FC<Props>
= React.memo(({ userPosts, activePost, setActivePost }) => {
  const handlePostStatus = (PostId: number) => {
    if (activePost === PostId) {
      setActivePost(null);
    } else {
      setActivePost(PostId);
    }
  };

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
          {userPosts?.map(post => {
            const { id, title } = post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button is-link',
                      { 'is-light': id !== activePost },
                    )}
                    onClick={() => handlePostStatus(id)}
                  >
                    {activePost === id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
