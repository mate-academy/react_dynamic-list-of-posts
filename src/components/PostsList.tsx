import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  postSelected: Post | null,
  handleSelectPost: (post: Post) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  postSelected,
  handleSelectPost,
}) => {
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
                  className={`button ${postSelected?.id === post.id ? 'is-link' : 'is-link is-light'}`}
                  onClick={() => {
                    handleSelectPost(post);
                  }}
                >
                  {postSelected?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
