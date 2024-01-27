import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
}) => {
  const handlePostSelect = useCallback(({
    id, title, userId, body,
  }: Post) => {
    if (selectedPost?.id === id) {
      setSelectedPost(null);
    } else {
      setSelectedPost({
        id,
        title,
        userId,
        body,
      });
    }
  }, [selectedPost, setSelectedPost]);

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
          {posts.map(({
            id,
            title,
            userId,
            body,
          }) => (
            <tr data-cy="Post" key={id}>
              <td data-cy="PostId">
                {id}
              </td>

              <td data-cy="PostTitle">
                {title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': selectedPost?.id !== id,
                  })}
                  onClick={() => handlePostSelect({
                    id,
                    title,
                    userId,
                    body,
                  })}
                >
                  {selectedPost?.id === id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
