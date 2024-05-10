import classNames from 'classnames';
import { PostsList } from '../components/PostsList';
import { PostDetails } from '../components/PostDetails';
import { UserSelector } from '../components/UserSelector';
import { Loader } from '../components/Loader';
import { PostsContext } from '../postsContext';
import { useContext } from 'react';

export const ListApp: React.FC = () => {
  const { selectedUser, loading, posts, error, selectedPost } =
    useContext(PostsContext);

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
                {loading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!posts.length && !error && selectedUser && !loading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts.length && <PostsList />}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
