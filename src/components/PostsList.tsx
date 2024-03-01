import React, { useContext } from 'react';
import cn from 'classnames';
import { Context } from '../context/Context';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const { posts, setSelectedPost, setIsCommenting, selectedPost } =
    useContext(Context);

  const handleSelectPost = (post: Post) => {
    setIsCommenting(false);
    if (post.id === selectedPost?.id) {
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
            <>
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button', 'is-link', {
                      'is-light': post.id !== selectedPost?.id,
                    })}
                    onClick={() => handleSelectPost(post)}
                  >
                    {selectedPost?.id === post.id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
