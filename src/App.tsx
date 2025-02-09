import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { AppProvider, useAppContext } from './components/HooksContext';
import { useEffect } from 'react';
import { CurError, CurLoading, getUsers } from './utils/servises';

const AppContent: React.FC = () => {
  const {
    selectedUser,
    setLoading,
    setErrorMessage,
    loading,
    errorMessage,
    posts,
    activePost,
    setAllUsers,
  } = useAppContext();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(CurLoading.Users);

      try {
        const users = await getUsers();

        setAllUsers(users);
        setErrorMessage(CurError.Empty);
      } catch (error) {
        setErrorMessage(CurError.LoadUsers);
      } finally {
        setLoading(CurLoading.Empty);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shouldShowNoPosts =
    posts.length === 0 &&
    loading === CurLoading.Empty &&
    selectedUser &&
    !errorMessage;

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

                {loading === CurLoading.Posts && <Loader />}

                {errorMessage === CurError.LoadPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {shouldShowNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && <PostsList />}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open':
                activePost && activePost.userId === selectedUser?.id,
            })}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};
