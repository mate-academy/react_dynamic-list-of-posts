import React, {
  useState,
  useEffect,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isVisibleUsers, setIsVisibleUsers] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
  }, []);

  const handleDropdown = () => {
    setIsVisibleUsers(!isVisibleUsers)
  };

  const handleUserClick = (user: User) => {
    setIsVisibleUsers(false);
    setIsLoading(true);
    setSelectedUser(user);
    setSelectedPost(null);

    getPosts(user.id)
      .then(setPosts)
      .catch(() => {
        setIsLoadingError(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  usersFromServer={users}
                  onUserClick={handleUserClick}
                  onDropdown={handleDropdown}
                  isVisibleUsers={isVisibleUsers}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading &&  <Loader />}

                {isLoadingError && (
                  <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!posts.length && selectedUser && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && selectedUser && !isLoadingError && (
                  <PostsList
                    postsFromServer={posts}
                    onSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
                    setIsFormVisible={setIsFormVisible}
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
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  currentPost={selectedPost}
                  isFormVisible={isFormVisible}
                  setIsFormVisible={setIsFormVisible}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
