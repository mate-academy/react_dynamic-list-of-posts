import React, { useState } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface Props {
  posts: Post[];
  onPostSelection: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({ posts, onPostSelection }) => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handlePostSelection = (selectedPost: Post) => {
    if (selectedPost.id === selectedPostId) {
      setSelectedPostId(null);
      onPostSelection(null);
    } else {
      setSelectedPostId(selectedPost.id);
      onPostSelection(selectedPost);
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
            <th></th>
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
                  className={classNames('button', 'is-link', {
                    'is-light': !(selectedPostId === post.id),
                  })}
                  onClick={() => handlePostSelection(post)}
                >
                  {selectedPostId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
