import React from 'react';
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
  if (!posts.length) {
    return (
      <div
        className="notification is-warning"
        data-cy="NoPostsYet"
      >
        No posts yet
      </div>
    );
  }

  const handleSelectPost = (post: Post) => {
    const changeTo = post.id === selectedPost?.id
      ? null
      : post;

    setSelectedPost(changeTo);
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
            const { title, id } = post;
            const isSelected = post.id === selectedPost?.id;

            return (
              <tr data-cy="Post">
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button is-link',
                      { 'is-light': !isSelected },
                    )}
                    onClick={() => handleSelectPost(post)}
                  >
                    { isSelected ? 'Close' : 'Open' }
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
