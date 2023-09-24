import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  handleOpenSidebar:(isSidebarOpen: boolean) => void,
  selectedPost: Post | null,
  handleSelectedPost:(post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts, handleOpenSidebar, handleSelectedPost, selectedPost,
}) => {
  const selectPostHandler = (post: Post) => {
    if (post.id !== selectedPost?.id) {
      handleSelectedPost(post);
      handleOpenSidebar(true);
    } else {
      handleSelectedPost(null);
      handleOpenSidebar(false);
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
            <th> </th>
          </tr>
        </thead>

        <tbody>

          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.body}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPost !== post,
                  })}
                  onClick={() => selectPostHandler(post)}
                >
                  {selectedPost === post ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
