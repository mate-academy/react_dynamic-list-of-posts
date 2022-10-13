import React from 'react';
import { IPost } from '../types/Post';

interface Props {
  posts: IPost[] | null;
  changePost: (post: IPost | null) => void;
  activePost: IPost | null;
}

export const PostsList: React.FC<Props> = ({
  posts, changePost, activePost,
}) => {
  if (!posts) {
    return null;
  }

  if (posts.length === 0) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

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
          {posts.map((post: IPost) => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.body}
              </td>

              {activePost?.id === post.id ? (
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => changePost(null)}
                  >
                    Close
                  </button>
                </td>
              ) : (
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => changePost(post)}
                  >
                    Open
                  </button>
                </td>
              )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
