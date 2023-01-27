/* eslint-disable func-names */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/bulma.sass';
import './App.scss';

import { useContext, useEffect, useState } from 'react';

import { AppContext } from './components/Context/AppContext';
import { Loader } from './components/Loader';
import { PostsList } from './components/PostsList';
import { Sidebar } from './components/Sidebar';
import { UserSelector } from './components/UserSelector';
import { IPost, User } from './types';
import { getPosts, getUsers } from './utils/api';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoadingPosts, setLoadingPosts] = useState(false);

  const { selectedUser } = useContext(AppContext);

  useEffect(() => {
    (async function () {
      try {
        setUsers(await getUsers());
      } catch {
        setHasError(true);
      }
    }());
  }, []);

  useEffect(() => {
    (async function () {
      if (selectedUser) {
        try {
          setPosts(await getPosts(selectedUser.id));
        } catch {
          setHasError(true);
        } finally {
          setLoadingPosts(false);
        }
      }
    }());
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  setLoading={setLoadingPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">
                  {!selectedUser && 'No user selected'}
                </p>

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isLoadingPosts
                  ? <Loader />
                  : ((
                    selectedUser && !hasError && (
                      (posts.length === 0 && (
                        <div
                          className="notification is-warning"
                          data-cy="NoPostsYet"
                        >
                          No posts yet
                        </div>
                      ))
                    || (
                      posts.length > 0 && (
                        <PostsList posts={posts} />
                      )
                    ))
                  ))}
              </div>
            </div>
          </div>

          <Sidebar />
        </div>
      </div>
    </main>
  );
};
