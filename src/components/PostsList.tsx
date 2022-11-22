import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  posts: Post[];
  selectedPostId?: number;
  selectPost: React.Dispatch<React.SetStateAction<Post | null>>;
  existedUser: User | null;
  withoutLoader: boolean;
  withoutError: boolean;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId = 0,
  selectPost,
  existedUser,
  withoutLoader,
  withoutError,
}) => {
  return (
    <>
      {existedUser && withoutLoader && withoutError && posts.length > 0 && (
        <div
          className="notification is-warning"
          data-cy="NoPostsYet"
        >
          No posts yet
        </div>
      )}

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
            {posts.map(post => {
              const { id, title } = post;

              return (
                <tr data-cy="Post" key={id}>
                  <td data-cy="PostId">{id}</td>

                  <td data-cy="PostTitle">
                    {title}
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames('button is-link',
                        { 'is-light': selectedPostId !== id })}
                      onClick={() => {
                        selectPost(selectedPostId === id ? null : post);
                      }}
                    >
                      {selectedPostId === id ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
