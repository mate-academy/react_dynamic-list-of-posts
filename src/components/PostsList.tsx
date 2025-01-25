import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface PostsListProps {
  posts: Post[];
  activePost: Post | null;
  handleActivePost: (post: Post | null) => void;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  activePost,
  handleActivePost,
}) => {
  const handlePostButton = (post: Post) => {
    if (activePost?.id === post.id) {
      handleActivePost(null);
    } else {
      handleActivePost(post);
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
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    ' is-light': post.id !== activePost?.id,
                  })}
                  onClick={() => handlePostButton(post)}
                >
                  {post.id === activePost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
