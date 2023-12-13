import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { Post } from '../../types/Post';

type Props = {
  posts: Post[];
  setIsOpen: Dispatch<SetStateAction<number | null>>;
  isOpen: number | null;
};

export const PostsList: React.FC<Props> = ({ posts, setIsOpen, isOpen }) => {
  const handleOpenPost = (id: number) => {
    if (isOpen === id) {
      setIsOpen(null);
    } else {
      setIsOpen(id);
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
                    className={cn('button', 'is-link', {
                      'is-light': isOpen !== id,
                    })}
                    onClick={() => handleOpenPost(id)}
                  >
                    {isOpen !== id ? 'Open' : 'Close'}
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
