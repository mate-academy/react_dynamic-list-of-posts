import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  visiblePosts: Post[],
  selectedPost: Post | null,
  onOpen: React.Dispatch<React.SetStateAction<Post | null>>,
};

export const PostsList: React.FC<Props> = ({
  visiblePosts,
  selectedPost,
  onOpen,
}) => {
  const toggleShowPost = (post: Post) => () => {
    if (selectedPost && selectedPost.id === post.id) {
      onOpen(null);
    } else {
      onOpen(post);
    }
  };

  return (
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
          {visiblePosts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': !selectedPost || selectedPost.id !== post.id,
                    },
                  )}
                  onClick={toggleShowPost(post)}
                >
                  {selectedPost && selectedPost.id === post.id
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
