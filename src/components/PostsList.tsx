import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface Props {
  userPosts: Post[];
  openedPost: Post | null;
  setOpenedPost: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  userPosts,
  openedPost,
  setOpenedPost,
}) => {
  const clickHandler = (post: Post) => {
    if (openedPost?.id === post.id) {
      setOpenedPost(null);

      return;
    }

    setOpenedPost(post);
  };

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
          {userPosts?.map(post => {
            const { id, title } = post;
            const isNotOpen = openedPost?.id !== id;

            return (
              <tr data-cy="Post" key={`post-${id}`}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button', 'is-link', {
                      'is-light': isNotOpen,
                    })}
                    onClick={() => clickHandler(post)}
                  >
                    {isNotOpen ? 'Open' : 'Close'}
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
