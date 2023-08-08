import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../../types/Post';

interface Props {
  posts: Post[];
  onPostOpen: (post: Post) => void;
  onPostClose: () => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  onPostOpen,
  onPostClose,
}) => {
  const [selectedPost, setSelectedPost] = useState<Post>();

  const handleOpenPost = (post: Post) => {
    if (selectedPost?.id !== post.id) {
      onPostOpen(post);
      setSelectedPost(post);
    } else {
      setSelectedPost(undefined);
      onPostClose();
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': (selectedPost?.id !== post.id),
                  })}
                  onClick={() => handleOpenPost(post)}
                >
                  {(selectedPost?.id === post.id) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
