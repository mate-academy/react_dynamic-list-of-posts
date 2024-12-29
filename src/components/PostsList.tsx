import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  isPostsList: false | Post[] | null;
  posts: Post[];
  setActivePost: (v: Post | null) => void;
  activePost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  isPostsList,
  posts,
  setActivePost,
  activePost,
}) => {
  if (!isPostsList || posts.length === 0) {
    return <div>No posts available.</div>;
  }

  const toggleOpenPost = (post: Post) => {
    if (!activePost || activePost.id !== post.id) {
      setActivePost(post);

      return;
    }

    setActivePost(null);
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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': activePost?.id !== post.id,
                  })}
                  onClick={() => toggleOpenPost(post)}
                >
                  {activePost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
