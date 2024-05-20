import { useContext } from 'react';
import cn from 'classnames';

import {
  PostsSettersContext,
  PostsValueContext,
} from '../../Context/PostsContext';

import { Post } from '../../types/Post';

export const PostsList: React.FC = () => {
  const { posts, postsIsLoading, selectedUser, isSidebarOpen, selectedPost } =
    useContext(PostsValueContext);

  const { setIsSidebarOpen, setSelectedPost } = useContext(PostsSettersContext);

  const shouldRenderPostsList =
    selectedUser && !postsIsLoading && !!posts.length;

  const handleOpenSidebar = (currentPost: Post) => {
    if (isSidebarOpen && selectedPost?.id === currentPost.id) {
      setIsSidebarOpen(false);
      setSelectedPost(null);

      return;
    }

    setIsSidebarOpen(true);
    setSelectedPost(currentPost);
  };

  return (
    shouldRenderPostsList && (
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
            {posts.map((post: Post) => {
              return (
                <tr data-cy="Post" key={post.id}>
                  <td data-cy="PostId">{post.id}</td>

                  <td data-cy="PostTitle">{post.title}</td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={cn('button is-link', {
                        'is-light': selectedPost?.id !== post.id,
                      })}
                      onClick={() => handleOpenSidebar(post)}
                    >
                      {selectedPost?.id === post.id ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
};
