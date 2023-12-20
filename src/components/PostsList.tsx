import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

interface Props {
  postsFromServer: Post[] | null;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  postsFromServer,
  selectedPost,
  setSelectedPost,
}) => {
  const handlePostClick = (post: Post) => {
    if (post.id === selectedPost?.id) {
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
          {postsFromServer?.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn(
                    'button is-link',
                    { 'is-light': post.id !== selectedPost?.id },
                  )}
                  onClick={() => handlePostClick(post)}
                >
                  {post.id !== selectedPost?.id ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
