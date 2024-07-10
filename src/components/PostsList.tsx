import { memo, useContext } from 'react';
import cn from 'classnames';

import { PostsContext } from '../store/PostsContext';
import { CommentsContext } from '../store/CommentsContext';
import { Post } from '../types/Post';

export const PostsList = memo(function PostsListComponent() {
  const { posts, selectedPost, setSelectedPost } = useContext(PostsContext);
  const { loadComments, setOpenForm, openForm } = useContext(CommentsContext);

  const getComments = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
      loadComments(post.id);
    }

    if (openForm) {
      setOpenForm(false);
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
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': selectedPost?.id !== post.id,
                  })}
                  onClick={() => getComments(post)}
                >
                  {selectedPost?.id !== post.id ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
