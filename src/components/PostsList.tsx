import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPostId?: number;
  onSelectPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onSelectPost,
}) => {
  function handleSelectPost(post?: Post) {
    onSelectPost(post || null);
  }

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
                {post.id === selectedPostId ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn(
                      'button',
                      'is-link',
                      post.id === selectedPostId ? '' : 'is-light',
                    )}
                    onClick={() => handleSelectPost()}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn(
                      'button',
                      'is-link',
                      post.id === selectedPostId ? '' : 'is-light',
                    )}
                    onClick={() => handleSelectPost(post)}
                  >
                    Open
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
