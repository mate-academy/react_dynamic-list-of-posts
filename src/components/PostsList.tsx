import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  // isPostsListExists: boolean;
  posts: Post[];
  setActivePost: (value: Post | null) => void;
  activePost: Post | null;
};
export const PostsList: React.FC<Props> = ({
  // isPostsListExists,
  posts,
  setActivePost,
  activePost,
}) => {
  // if (isPostsListExists)
  // {return <div>No posts available.</div>}

  const toggleOpenPost = (post: Post) => {
    if (!activePost || activePost.id !== post.id) {
      setActivePost(post);

      return;
    }

    setActivePost(null);
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th
              className="has-text-right is-vcentered"
              style={{ padding: '0px 25px 0px 0px' }}
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': activePost?.id !== post.id,
                  })}
                  onClick={() => toggleOpenPost(post)}
                >
                  {activePost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
          {/*<tr data-cy="Post">
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
        </tr> */}
        </tbody>
      </table>
    </div>
  );
};
