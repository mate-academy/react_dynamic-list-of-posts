import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  onSelectPost: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onSelectPost,
}) => {
  return (
    <div data-cy="PostsList">
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            const isSelected = selectedPost?.id === post.id;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>
                <td className="has-text-right is-vcentered">
                  {/* Якщо пост вже відкритий, показуємо кнопку Close, інакше - Open */}
                  {isSelected ? (
                    <button
                      type="button"
                      className="button is-info"
                      data-cy="PostButton"
                      onClick={() => onSelectPost(null)}
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="button is-info is-light"
                      data-cy="PostButton"
                      onClick={() => onSelectPost(post)}
                    >
                      Open
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
