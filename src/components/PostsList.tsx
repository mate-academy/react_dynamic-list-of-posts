import React, { useContext } from 'react';
import cn from 'classnames';
import { PostsContext } from '../postsContext';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const { posts, setSelectedPost, selectedPost, setWriteCommentButton } =
    useContext(PostsContext);

  const handleSelectPost = (p: Post) => {
    if (!selectedPost) {
      setSelectedPost(p);
      setWriteCommentButton(false);

      return;
    }

    if (selectedPost?.id === p.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(p);
    setWriteCommentButton(false);
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>
      {/* eslint-disable-next-line */}
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
                  className={cn('button is-link', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => handleSelectPost(post)}
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
