import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

interface PostsListProps {
  posts: Post[];
  selectedPostId: number | null;
  onSelectPost: (postId: number) => void;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  selectedPostId,
  onSelectPost,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            const isSelected = post.id === selectedPostId;
            const buttonLabel = isSelected ? 'Close' : 'Open';

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button', 'is-link', {
                      'is-light': !isSelected,
                    })}
                    onClick={() => onSelectPost(post.id)}
                  >
                    {buttonLabel}
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
