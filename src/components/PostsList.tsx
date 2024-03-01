import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  setIsSidebarOpen: (isOpen: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setIsSidebarOpen,
  selectedPost,
  setSelectedPost,
}) => {
  const hanldleOpenPostDetails = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setIsSidebarOpen(false);
      setSelectedPost(null);

      return;
    }

    setIsSidebarOpen(true);

    setSelectedPost(post);
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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => hanldleOpenPostDetails(post)}
                >
                  {selectedPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
