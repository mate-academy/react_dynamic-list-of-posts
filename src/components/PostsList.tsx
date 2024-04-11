import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  onPostSelection: (post: Post | null) => void;
}

enum ButtonName {
  Open = 'Open',
  Close = 'Close',
}

export const PostsList: React.FC<Props> = ({ posts, onPostSelection }) => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handlePostSelection = (selectedPost: Post) => {
    if (selectedPostId === selectedPost.id) {
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
                  className={classNames('button', 'is-link', {
                    'is-light': !(selectedPostId === post.id),
                  })}
                  onClick={() => handlePostSelection(post)}
                >
                  {selectedPostId === post.id
                    ? ButtonName.Close
                    : ButtonName.Open}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
