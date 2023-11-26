import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[] | null;
  selectedPost: Post | null;
  handlePostSelected: (postr: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  handlePostSelected,
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
        {posts?.map(post => {
          const isSelected = selectedPost?.id === post.id;
          const onSelected = () => {
            if (isSelected) {
              handlePostSelected(null);
            } else {
              handlePostSelected(post);
            }
          };

          return (
            <tr data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button is-link',
                    { 'is-light': !isSelected },
                  )}
                  onClick={onSelected}
                >
                  {isSelected
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
