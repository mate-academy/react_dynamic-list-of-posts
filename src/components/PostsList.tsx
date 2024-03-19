import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
}) => {
  const handlePostInfo = (id: number) => {
    if (selectedPost?.id === id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(posts.find(post => post.id === id) || null);
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
          {posts.map(post => {
            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': selectedPost?.id !== post.id,
                    })}
                    onClick={() => handlePostInfo(post.id)}
                  >
                    {selectedPost?.id === post.id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
