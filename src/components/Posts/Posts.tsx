import classNames from 'classnames';
import { Loader } from '../Loader';
import { PostList } from './PostList/PostList';
import { UserSelector } from '../UserSelector/UserSelector';
import { PostDetails } from './PostDetails/PostDetails';
import { useContext } from 'react';
import { PostsContext } from '../../context/PostContext';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

export const Posts = () => {
  const { selectedUser, posts, isLoadingPosts, postsError, selectedPost } =
    useContext(PostsContext);

  const isPostsEmpthy = selectedUser && !posts.length && !isLoadingPosts;

  const getPostview = () => {
    if (postsError) {
      return <ErrorNotification />;
    }

    if (isPostsEmpthy) {
      return (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      );
    }

    if (selectedUser && !!posts.length) {
      return <PostList posts={posts} />;
    }

    return null;
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {getPostview()}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
