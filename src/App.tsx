import { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { useUsers } from './context/UsersContext';
import { getPostsById } from './api/posts';
import { usePosts } from './context/PostsContext';
import { Loader } from './components/Loader';
import { useError } from './context/ErrorContext';
import { Sidebar } from './components/Sidebar';

export const App: React.FC = () => {
  const { user } = useUsers();
  const { posts, setPosts } = usePosts();
  const { isErrorHappen, setIsErrorHappen } = useError();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getPostsById(user.id)
        .then((postsFromServer) => {
          setPosts(postsFromServer);
        })
        .catch(() => setIsErrorHappen(true))
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  const isPostListShown = (posts.length > 0 && user);
  const isPostsExist = user && posts.length === 0;

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
                {!user && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {isPostsExist && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {isPostListShown && (
                      <PostsList />
                    )}
                  </>
                )}

                {isErrorHappen && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

              </div>
            </div>
          </div>

          <Sidebar />
        </div>
      </div>
    </main>
  );
};
