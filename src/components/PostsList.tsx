import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  activePostId: null | number;
  posts: Post[];
  onPostClick: (postId: number) => void;
};

export const PostsList: React.FC<Props> = ({
  activePostId,
  posts,
  onPostClick,
}) => {
  const handlePostClick = (postId: number) => onPostClick(postId);

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
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': activePostId !== post.id,
                    })}
                    onClick={() => handlePostClick(post.id)}
                  >
                    {activePostId !== post.id ? 'Open' : 'Close'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
