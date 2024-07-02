import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  userPosts: Post[];
  selectedPost: Post | null;
  onSelect: (selectedPost: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  selectedPost,
  onSelect,
}) => {
  const selectedPostId = selectedPost?.id;

  const handleSelect = (post: Post) => {
    if (!selectedPost) {
      onSelect(post);
    } else if (selectedPost && selectedPostId !== post.id) {
      onSelect(post);
    } else {
      onSelect(null);
    }
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {userPosts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': selectedPostId !== post.id,
                  })}
                  onClick={() => handleSelect(post)}
                >
                  {(!selectedPost && selectedPostId === post.id) ||
                  (selectedPost && selectedPost.id === post.id)
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}

          {/* <tr data-cy="Post">
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
