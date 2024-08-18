import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  setActivePostId: (id: number | null) => void;
};

export const PostsList: React.FC<Props> = ({ posts, setActivePostId }) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const openPost = (id: number) => {
    setIsOpen(id);
    setActivePostId(id);
  };

  const closePost = () => {
    setIsOpen(null);
    setActivePostId(null);
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
          {posts.map(({ id, title }) => (
            <tr data-cy="Post" key={id}>
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">{title}</td>

              <td className="has-text-right is-vcentered">
                {isOpen === id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={closePost}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => openPost(id)}
                  >
                    Open
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
