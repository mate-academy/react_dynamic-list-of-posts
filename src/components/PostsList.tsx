import React from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  posts: Post[];
  selectedUser: User | null;
  selectPostHandler: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedUser,
  selectPostHandler,
}) => (
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
        {selectedUser &&
          posts
            .filter(post => post.userId === selectedUser.id)
            .map(post => (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={event => {
                      event.preventDefault();
                      selectPostHandler(post);
                    }}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  </div>
);
