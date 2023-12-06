import React, { Dispatch, SetStateAction } from 'react';
import { Post } from '../types/Post';

interface T {
  userPosts: Post[];
  setSelectedPost: Dispatch<SetStateAction<null | Post>>;
  selectedPost: null | Post;
}

export const PostsList: React.FC<T> = ({
  userPosts,
  setSelectedPost,
  selectedPost,
}) => (
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
        {userPosts.map(({
          id,
          title,
          userId,
          body,
        }) => (
          <tr data-cy="Post" key={id}>
            <td data-cy="PostId">{id}</td>

            <td data-cy="PostTitle">
              {title}
            </td>

            <td className="has-text-right is-vcentered">
              {selectedPost?.id === id ? (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link"
                  onClick={() => setSelectedPost(null)}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => setSelectedPost({
                    id,
                    title,
                    userId,
                    body,
                  })}
                >
                  Open
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
