import classNames from 'classnames';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadApiPosts } from '../features/postsSlice';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { setSelectedPost } from '../features/selectedPostSlice';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(store => store.selectedPost.selectedPost);
  const loaded = useAppSelector(store => store.posts.loaded);
  const hasError = useAppSelector(store => store.posts.hasError);
  const author = useAppSelector(store => store.author.author);
  const posts = useAppSelector(store => store.posts.items);

  useEffect(() => {
    if (!author) {
      return;
    }

    dispatch(loadApiPosts(author?.id));
  }, [author]);

  const handleSelectPost = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  };

  const IS_NO_ERROR = author && loaded && !hasError;

  return (
    <>
      {author && !loaded && (
        <Loader />
      )}

      {author && loaded && hasError && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      )}

      {(IS_NO_ERROR && !posts.length) && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {IS_NO_ERROR && !!posts.length && (
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
              {posts.map(post => (
                <tr key={post.id} data-cy="Post">
                  <td data-cy="PostId">{post.id}</td>
                  <td data-cy="PostTitle">{post.title}</td>
                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames(
                        'button',
                        'is-link',
                        {
                          'is-light': post.id !== selectedPost?.id,
                        },
                      )}
                      onClick={() => handleSelectPost(post)}
                    >
                      {post.id === selectedPost?.id ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
