import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  isSideBarOpen: boolean;
  setIsSideBarOpen: (item: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  setIsAddFormShown: (item: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  isSideBarOpen,
  setIsSideBarOpen,
  selectedPost,
  setSelectedPost,
  setIsAddFormShown,
}) => {
  const handleOpenPost = (post: Post) => {
    setIsSideBarOpen(true);
    setSelectedPost(post);
    setIsAddFormShown(false);
  };

  const handleClosePost = () => {
    setIsSideBarOpen(false);
    setSelectedPost(null);
  };

  const close = isSideBarOpen && selectedPost && selectedPost.id;

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
                {(!selectedPost || selectedPost.id !== post.id) && (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => handleOpenPost(post)}
                  >
                    Open
                  </button>
                )}
                {close === post.id && (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={handleClosePost}
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
  );
};
