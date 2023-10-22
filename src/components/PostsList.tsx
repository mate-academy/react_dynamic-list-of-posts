import React, { useContext } from 'react';
import cn from 'classnames';
import { PostsContext } from '../PostsContext';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const {
    postsFromServer,
    currentPost,
    setCurrentPost,
  } = useContext(PostsContext);

  const handleClick = (value: Post) => {
    if (currentPost?.id === value.id) {
      setCurrentPost(null);

      return;
    }

    setCurrentPost(value);
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
          {postsFromServer?.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': currentPost?.id !== post.id,
                  })}
                  onClick={() => handleClick(post)}
                >
                  {currentPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
