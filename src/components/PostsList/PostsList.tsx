import React from 'react';

import { Post } from '../../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  isOpenSidebar: boolean;
  onIsOpenSidebar: (isOpen: boolean) => void;
  onSelectPost: (post: Post) => void;
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  isOpenSidebar,
  onIsOpenSidebar,
  selectedPost,
  onSelectPost,
}) => {
  const handleOpenPost = (post: Post) => {
    onSelectPost(post);
    onIsOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    onIsOpenSidebar(false);
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
          {posts.map(post => {
            const isActive = selectedPost?.id === post.id && isOpenSidebar;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': !isActive,
                    })}
                    onClick={() => {
                      if (isActive) {
                        handleCloseSidebar();
                      } else {
                        handleOpenPost(post);
                      }
                    }}
                  >
                    {isActive ? 'Close' : 'Open'}
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
