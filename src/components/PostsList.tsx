import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  onSelect: (post: Post | null) => void,
  selectedPost: Post | null,
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelect,
  selectedPost,
}) => (
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
        {posts.map(post => {
          const { id, title } = post;

          const handleSelectPost = () => {
            if (selectedPost?.id !== id) {
              onSelect(post);
            } else {
              onSelect(null);
            }
          };

          return (
            <tr data-cy="Post">
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">
                {title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': selectedPost?.id !== id },
                  )}
                  onClick={handleSelectPost}
                >
                  {(selectedPost?.id !== id)
                    ? 'Open'
                    : 'Close'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
