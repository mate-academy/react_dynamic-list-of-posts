import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getUserPosts, getUsers } from './client/clientMethods';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getUsers()
      .then(result => setUsers(result))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  function loadUserPosts(user: User) {
    setIsLoading(true);
    setActiveUser(user);

    getUserPosts(user.id)
      .then(posts => setUserPosts(posts))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  loadUserPosts={loadUserPosts}
                  activeUser={activeUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isLoading && <Loader />}

                {!activeUser && !isLoading && !isError && (
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

                {userPosts?.length === 0 && activeUser && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userPosts?.length !== 0 && userPosts && !isLoading && (
                  <PostsList
                    userPosts={userPosts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setIsFormOpened={setIsFormOpened}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && !isError && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  isFormOpened={isFormOpened}
                  setIsFormOpened={setIsFormOpened}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
