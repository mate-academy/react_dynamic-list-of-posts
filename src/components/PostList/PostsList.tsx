import classNames from 'classnames';
import React from 'react';
import { Post } from '../../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
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

        {posts.map(post => {
          const { id, title } = post;

          return (
            <tbody key={id}>
              <tr data-cy="Post">
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': selectedPost?.id !== id,
                    })}
                    onClick={() => {
                      setSelectedPost(selectedPost?.id !== id
                        ? post : null);
                    }}
                  >
                    {selectedPost?.id === id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};
