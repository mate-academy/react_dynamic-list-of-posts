import {
  FunctionComponent,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { UserSelector } from '../UserSelector';
import { Loader } from '../Loader';
import { PostsList } from '../PostList';

import { PostDetails } from '../PostDetails';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUserPosts, fetchUsers } from '../../app/thunks';
import { closePost } from '../../features/selectedPostSlice';
import { removePosts } from '../../features/postsSlice';

export const Main: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author.author);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);
  const { post: selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(closePost());

    dispatch(author
      ? fetchUserPosts(author.id)
      : removePosts());
  }, [author?.id, dispatch]);

  return (
    <div className="container">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <div className="tile is-child box is-success">
            <div className="block">
              <UserSelector />
            </div>

            <div className="block" data-cy="MainContent">
              {!author && (
                <p data-cy="NoSelectedUser">
                  No user selected
                </p>
              )}

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

              {author && loaded && !hasError && !posts.length && (
                <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div>
              )}

              {author && loaded && !hasError && posts.length > 0 && (
                <PostsList
                  selectedPostId={selectedPost?.id}
                />
              )}
            </div>
          </div>
        </div>

        <div
          data-cy="Sidebar"
          className={classNames(
            'tile',
            'is-parent',
            'is-8-desktop',
            'Sidebar',
            {
              'Sidebar--open': selectedPost,
            },
          )}
        >
          <div className="tile is-child box is-success ">
            {selectedPost && (
              <PostDetails post={selectedPost} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
