import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getPosts, getUsers } from './utils/getData';
import { Post } from './types/Post';
import classNames from 'classnames';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostLoaded, setIsPostLoaded] = useState(false);

  const [isError, setIsError] = useState(false);

  const handleSelectedUser = (user: User | null) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  useEffect(() => {
    getUsers()
      .then(fetchedUsers => {
        setUsers(fetchedUsers);
      })
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsPostLoaded(false);
    getPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsPostLoaded(true));
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
                  selectedUser={selectedUser}
                  setSelectedUser={handleSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isError && selectedUser && (
                  <PostsList
                    isPostLoaded={isPostLoaded}
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
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
              { 'Sidebar--open': Boolean(selectedPost) },
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
