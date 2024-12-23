import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../../types/Post';

interface Props {
  posts: Post[];
  onSelect: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({ posts, onSelect }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleOnClick = (post: Post) => {
    const newSelectedPost =
      selectedPost && selectedPost.id === post.id ? null : post;

    setSelectedPost(newSelectedPost);
    onSelect(newSelectedPost);
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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': !selectedPost || selectedPost.id !== post.id,
                  })}
                  onClick={() => handleOnClick(post)}
                >
                  {!selectedPost || selectedPost.id !== post.id
                    ? 'Open'
                    : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
