import React from 'react';
import { Post } from '../types/Post';

type Props = {
  onSelectPost: (post: Post | null) => void,
  posts: Post[],
  selectedPostId: number | undefined,
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelectPost,
  selectedPostId,
}) => {
  return (
    <>
      {posts.length ? (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>

          <table className="
            table
            is-fullwidth
            is-striped
            is-hoverable
            is-narrow"
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
                <tr data-cy="Post">
                  <td data-cy="PostId">{post.id}</td>

                  <td data-cy="PostTitle">
                    {post.title}
                  </td>

                  <td className="has-text-right is-vcentered">
                    {selectedPostId !== post.id ? (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="
                          button
                          is-link
                          is-light
                        "
                        onClick={() => {
                          onSelectPost(post);
                        }}
                      >
                        Open
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link"
                        onClick={() => {
                          onSelectPost(null);
                        }}
                      >
                        Close
                      </button>
                    )}
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
