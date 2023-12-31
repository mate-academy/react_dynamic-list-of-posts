import React from 'react';
import { Post } from '../types/Post';

export type PostsListProps = {
  posts: Post[]
  postId: number | null
  setPostId: (id: number | null) => void
};

export const PostsList: React.FC<PostsListProps>
= ({ posts, postId, setPostId }) => (
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
        {posts.map(({ id, title }) => (
          <tr data-cy="Post" key={id}>
            <td data-cy="PostId">{id}</td>

            <td data-cy="PostTitle">
              {title}
            </td>

            <td className="has-text-right is-vcentered">
              {id === postId ? (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link"
                  onClick={() => setPostId(null)}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => setPostId(id)}
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

/*
        <tr data-cy="Post">
          <td data-cy="PostId">17</td>

          <td data-cy="PostTitle">
            fugit voluptas sed molestias voluptatem provident
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">18</td>

          <td data-cy="PostTitle">
            voluptate et itaque vero tempora molestiae
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link"
            >
              Close
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">19</td>
          <td data-cy="PostTitle">adipisci placeat illum aut reiciendis qui</td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">20</td>
          <td data-cy="PostTitle">doloribus ad provident suscipit at</td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr>
*/
