import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type PostsListProps = {
  userPosts: Post[] | null;
  setSelectedPostId: (id: number | null) => void;
  selectedPostId: number | null;
};

export const PostsList: React.FC<PostsListProps> = ({
  userPosts,
  setSelectedPostId,
  selectedPostId,
}) => {
  const handleButtonClick = (postId: number) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(postId);
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
          {userPosts?.map(post => {
            const isSelected = selectedPostId === post.id;

            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': !isSelected,
                    })}
                    onClick={() => handleButtonClick(post.id)}
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
};
