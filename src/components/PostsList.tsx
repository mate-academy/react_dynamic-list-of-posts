import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

interface PostsListProps {
  selectedUserPosts: Post[];
  onSelecPost: (post: Post) => void;
  selectedPost: Post | null;
}

export const PostsList: React.FC<PostsListProps> = React.memo(({
  selectedUserPosts,
  onSelecPost,
  selectedPost,
}) => (
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
        {selectedUserPosts.map(post => {
          const { id, title } = post;
          const isSelected = selectedPost?.id === post.id;

          return (
            <tr data-cy="Post" key={id}>
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">
                {title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': !isSelected,
                  })}
                  onClick={() => onSelecPost(post)}
                >
                  {isSelected ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>

          );
        })}
      </tbody>
    </table>
  </div>
));
