import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[],
  handleSelectedPost: (event: React.MouseEvent<HTMLButtonElement>) => void,
  selectedPost: Post | null,
}

export const PostsList: React.FC<Props> = ({
  posts,
  handleSelectedPost,
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

          const isSelected = selectedPost?.id === id;

          return (
            <tr data-cy="Post" key={id}>
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">
                {title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  id={`${id}`}
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button is-link', { 'is-light': !isSelected },
                  )}
                  onClick={handleSelectedPost}
                >
                  {isSelected ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
