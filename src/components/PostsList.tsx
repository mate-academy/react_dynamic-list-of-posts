import React from 'react';
import { usePosts } from '../providers/PostProvider';
import { Post } from '../types/Post';
import classNames from 'classnames';

export const PostsList: React.FC = () => {
  const { posts, selectedPost, selectPost } = usePosts();

  const handleSelectPost = (post: Post) => () => {
    selectPost(post.id !== selectedPost?.id ? post : null);
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
          {posts.map(p => (
            <tr key={p.id} data-cy="Post">
              <td data-cy="PostId">{p.id}</td>

              <td data-cy="PostTitle">{p.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': !selectedPost || selectedPost.id !== p.id,
                  })}
                  onClick={handleSelectPost(p)}
                >
                  {selectedPost?.id === p.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
