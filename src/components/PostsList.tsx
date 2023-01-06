import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

export type Props = {
  posts: Post[],
  onSelectPost: React.Dispatch<React.SetStateAction<Post | null>>,
  selectedPost: Post | null,
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelectPost,
  selectedPost,
}) => {
  return (
    <>
      {posts.length > 0 ? (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>

          <table
            className="table is-fullwidth is-striped is-hoverable is-narrow"
          >
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
                  <td data-cy="PostId">
                    {post.id}
                  </td>

                  <td data-cy="PostTitle">
                    {post.title}
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames(
                        'button is-link', { 'is-light': selectedPost !== post },
                      )}
                      onClick={() => {
                        onSelectPost(selectedPost === post ? null : post);
                      }}
                    >
                      {selectedPost === post ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}
    </>
  );
};
