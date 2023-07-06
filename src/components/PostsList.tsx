import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

interface PostListProps {
  posts: Post[],
  postSelected: (post: Post) => void,
}

export const PostsList: React.FC<PostListProps> = ({
  posts,
  postSelected,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

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
                    className={classNames('button is-link', {
                      'is-light': selectedId !== id,
                    })}
                    onClick={() => {
                      postSelected(post);
                      if (selectedId !== id) {
                        setSelectedId(id);
                      } else {
                        setSelectedId(null);
                      }
                    }}
                  >
                    {selectedId === id ? 'Close' : 'Open'}
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
