import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[],
  currentPost: Post | null;
  setPost: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({ posts, currentPost, setPost }) => {
  const handleClick = (post: Post) => {
    if (currentPost?.id !== post.id) {
      setPost(post);
    } else {
      setPost(null);
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">
                {post.title}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={`button is-link ${currentPost?.id !== post.id && 'is-light'}`}
                  onClick={() => handleClick(post)}
                >
                  {currentPost?.id !== post.id ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
