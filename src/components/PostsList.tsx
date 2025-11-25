import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface PostListProps {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
}

export const PostsList: React.FC<PostListProps> = ({
  posts,
  selectedPost,
  setSelectedPost,
}) => {
  const handlePostClick = (post: Post) => {
    const isAlreadySelected = selectedPost?.id === post.id;

    if (isAlreadySelected) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
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
            const isSelected = selectedPost?.id === post.id;
            const buttonText = isSelected ? 'Close' : 'Open';
            const buttonClass = isSelected ? 'is-link' : 'is link is-light';

            return (
              <tr
                data-cy="Post"
                key={post.id}
                className={classNames({
                  'has-background-link-light': isSelected,
                })}
              >
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={`button ${buttonClass}`}
                    onClick={() => handlePostClick(post)}
                  >
                    {buttonText}
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
