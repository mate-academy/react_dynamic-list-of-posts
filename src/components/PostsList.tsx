import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  onSelectPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelectPost,
}) => {
  const [currenPost, setCurrentPost] = useState(-1);

  const handleSelectPost = (post: Post) => {
    setCurrentPost(post.id);
    onSelectPost(post);
  };

  const handleDeselectPost = () => {
    onSelectPost(null);
    setCurrentPost(-1);
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
          {posts.map((post) => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': currenPost !== post.id,
                    },
                  )}
                  onClick={() => (
                    currenPost === post.id
                      ? handleDeselectPost()
                      : handleSelectPost(post)
                  )}
                >
                  {currenPost === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
