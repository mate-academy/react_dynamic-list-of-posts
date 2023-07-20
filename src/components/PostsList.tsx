import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  postSelected: Post | null;
  handleSelectPost: (post: Post) => void;
};

export const PostsList: React.FC<Props> = (
  { posts, postSelected, handleSelectPost },
) => {
  const renderPostRow = (post: Post) => {
    const isPostSelected = postSelected?.id === post.id;

    return (
      <tr data-cy="Post" key={post.id}>
        <td data-cy="PostId">{post.id}</td>
        <td data-cy="PostTitle">{post.title}</td>
        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className={`button ${isPostSelected ? 'is-link' : 'is-link is-light'}`}
            onClick={() => handleSelectPost(post)}
          >
            {isPostSelected ? 'Close' : 'Open'}
          </button>
        </td>
      </tr>
    );
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
          {posts.map(renderPostRow)}
        </tbody>
      </table>
    </div>
  );
};
