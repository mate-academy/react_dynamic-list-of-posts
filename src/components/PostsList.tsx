import React from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import classNames from 'classnames';

interface PostListProps {
  posts: Post[];
  isPostLoaded: boolean;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
}

export const PostsList: React.FC<PostListProps> = ({
  posts,
  isPostLoaded,
  selectedPost,
  setSelectedPost,
}) => {
  if (!isPostLoaded) {
    return <Loader />;
  }

  if (!posts.length) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  const handleSelectingPost = (post: Post | null) => {
    if (post?.id === selectedPost?.id) {
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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => handleSelectingPost(post)}
                >
                  {post.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
