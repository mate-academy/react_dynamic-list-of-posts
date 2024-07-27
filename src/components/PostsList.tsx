import React from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';

type Props = {
  userPosts: Post[];
  selectedUserPost: Post | null;
  setSelectedUserPost: (user: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  selectedUserPost,
  setSelectedUserPost,
}) => {
  const handleToSelectPost = (post: Post) => {
    if (selectedUserPost && selectedUserPost.id === post.id) {
      setSelectedUserPost(null);
    } else {
      setSelectedUserPost(post);
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
          {userPosts.map(post => {
            const { id, title } = post;
            const isOpenedPost = selectedUserPost?.id === id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>
                <td data-cy="PostTitle">{title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button', 'is-link', {
                      'is-light': !isOpenedPost,
                    })}
                    onClick={() => handleToSelectPost(post)}
                  >
                    {!isOpenedPost ? 'Open' : 'Close'}
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
