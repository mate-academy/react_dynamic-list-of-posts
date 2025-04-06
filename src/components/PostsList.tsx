import React, { useState } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  onPostId: (id: number) => void;
};

export const PostsList: React.FC<Props> = ({ posts, onPostId }) => {
  const [selectedPost, setSelectedPost] = useState(0);

  const handleSelectPost = (id: number) => {
    if (selectedPost === id) {
      onPostId(0);
      setSelectedPost(0);

      return;
    }

    onPostId(id);
    setSelectedPost(id);
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
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    post.id !== selectedPost ? 'is-light' : '',
                  )}
                  onClick={() => handleSelectPost(post.id)}
                >
                  {post.id !== selectedPost ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
