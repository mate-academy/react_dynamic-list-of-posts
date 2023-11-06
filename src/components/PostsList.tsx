import React from 'react';
import { Post } from '../types/Post';

type Props = {
  userPosts: Post[];
  currentPost: Post | null;
  onPostSelected: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  currentPost,
  onPostSelected,
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
        {userPosts.map(userPost => (
          <tr
            key={userPost.id}
            data-cy="Post"
          >
            <td data-cy="PostId">{userPost.id}</td>

            <td data-cy="PostTitle">
              {userPost.title}
            </td>

            <td className="has-text-right is-vcentered">
              {currentPost?.id === userPost.id ? (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link"
                  onClick={() => onPostSelected(null)}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => onPostSelected(userPost)}
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
