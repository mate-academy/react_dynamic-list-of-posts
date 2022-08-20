import cn from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  onOpen: (newPost: Post) => void;
  selectedPost: Post | null;
}

export const PostsList: React.FC<Props> = ({ posts, onOpen, selectedPost }) => (
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
        {posts.map(post => (
          <tr data-cy="Post" key={post.id}>
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">
              {post.title}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={cn('button is-link',
                  { 'is-light': selectedPost !== post })}
                onClick={() => onOpen(post)}
              >
                Open
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
