import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  userPosts: Post[];
  selectedUserPost: Post | null;
  setIsFormOpen: (value: boolean) => void;
  setSelectedUserPost: (value: Post | null) => void;
  loadUserComment: (value: number) => Promise<void>;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  selectedUserPost,
  setIsFormOpen,
  setSelectedUserPost,
  loadUserComment,
}) => {
  const handleBtnClick = (post: Post) => {
    setSelectedUserPost(post.id === selectedUserPost?.id ? null : post);
    loadUserComment(post.id);
    setIsFormOpen(false);
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
          {userPosts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': post.id !== selectedUserPost?.id,
                  })}
                  onClick={() => handleBtnClick(post)}
                >
                  {post.id === selectedUserPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
