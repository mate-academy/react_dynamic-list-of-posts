import React, { useCallback } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  user: User | null,
  posts: Post[],
  isSidebar: boolean,
  setIsSidebar: (value: boolean) => void,
  selectedPost: Post | null,
  setSelectedPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = (
  {
    user,
    posts,
    isSidebar,
    setIsSidebar,
    selectedPost,
    setSelectedPost,
  },
) => {
  const handleSidebar = useCallback((post) => {
    if (selectedPost && post.id === selectedPost.id) {
      setSelectedPost(null);
      setIsSidebar(false);

      return;
    }

    setSelectedPost(post);
    setIsSidebar(true);
  }, [isSidebar, selectedPost]);

  return (
    <>
      {user && (
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
              {posts.map(post => {
                return (
                  <tr
                    key={post.id}
                    data-cy="Post"
                  >
                    <td data-cy="PostId">{post.id}</td>

                    <td data-cy="PostTitle">
                      {post.title}
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link is-light"
                        onClick={() => {
                          handleSidebar(post);
                        }}
                      >
                        {(selectedPost && selectedPost.id === post.id)
                          ? 'Close'
                          : 'Open' }
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
