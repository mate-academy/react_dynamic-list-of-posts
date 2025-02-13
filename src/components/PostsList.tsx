import React from 'react';
import { Post } from '../types/Post';
// import { Loader } from './Loader';
import classNames from 'classnames';

interface PostProps {
  posts: Post[];
  setSelectedPost: (post: Post | null) => void;
  selectedPosts: Post | null;
  isLoading: boolean;
}

export const PostsList: React.FC<PostProps> = ({
  setSelectedPost,
  posts,
  selectedPosts,
}) => {
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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': selectedPosts?.id !== post.id,
                  })}
                  onClick={() => {
                    setSelectedPost(
                      selectedPosts?.id === post.id ? null : post,
                    );
                  }}
                >
                  {selectedPosts?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
