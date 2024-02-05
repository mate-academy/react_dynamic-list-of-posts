import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  onPostSelect: (post: Post | null) => void;
  onFormStatusChange: (value: boolean) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onPostSelect,
  onFormStatusChange,
}) => {
  const handleClick = (post: Post) => {
    const updatedSelectedPost = selectedPost === post ? null : post;

    onPostSelect(updatedSelectedPost);
    onFormStatusChange(false);
  };

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
                    className={cn('button is-link',
                      { 'is-light': selectedPost?.id !== id })}
                    onClick={() => handleClick(post)}
                  >
                    {selectedPost?.id === id ? 'Close' : 'Open'}
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
