import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type PostsListProps = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  selectedPost,
  setSelectedPost,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>
      {/* eslint-disable max-len */}
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
                  className={classNames('button is-link ', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => {
                    setSelectedPost(post);
                    if (post.id === selectedPost?.id) {
                      setSelectedPost(null);
                    }
                  }}
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
