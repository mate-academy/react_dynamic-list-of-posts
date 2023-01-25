/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

// import classNames from 'classnames';
import { PostList } from './components/PostsList';
// import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { getUsers } from './api/user';
import { User } from './types/User';
import { Post } from './types/Post';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';

enum Errors {
  ServerUsers = 'Unable to load users from the Server',
  // Add = 'Title can\'t be empty',
  // Delete = 'Unable to delete a todo',
  // Update = 'Unable to update a todo',
}

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Errors | null>(null);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [pendingPosts, setPendingPosts] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchUsers = () => {
    getUsers()
      .then((usersFromServer) => {
        console.log(1);
        setUsers(usersFromServer);
      })
      .catch((e) => {
        console.log(2, e);
        setError(Errors.ServerUsers);
      })
      .finally(() => console.log('FINALLY'));
  };

  const fetchPosts = async (user: User) => {
    try {
      const postsFromServer: Post[] = await client.get(`/posts?userId=${user.id}`);

      setPosts(postsFromServer);
    } catch {
      // console.log('Error');
      setError(Errors.ServerUsers);
    } finally {
      setPendingPosts(false);
    }
  };

  const showUserPosts = (user: User) => {
    setActiveUser(user);
    setPendingPosts(true);
    fetchPosts(user);
  };

  const userPostIsLoaded = activeUser && !pendingPosts;

  useEffect(() => {
    fetchUsers();
  }, []);

  // console.log(posts);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  activeUser={activeUser}
                  pendingPosts={pendingPosts}
                  showUserPosts={showUserPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {pendingPosts && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {userPostIsLoaded && (
                  <PostList posts={posts} />
                )}
                {(userPostIsLoaded && !posts.length) && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostssYet"
                  >
                    No Posts yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};
