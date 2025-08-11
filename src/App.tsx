import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUserPosts, getUsers } from './api/api';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const loadUsers = async () => {
    setIsErrorShown(false);

    try {
      const usersFromServer = await getUsers();

      if (usersFromServer.length === 0) {
        setIsErrorShown(true);
      }

      setUsers(usersFromServer);
    } catch (err) {
      setIsErrorShown(true);
    }
  };

  const loadUserPosts = async (userId: number) => {
    setIsErrorShown(false);
    setIsLoading(true);

    try {
      const userPostsFromServer = await getUserPosts(userId);

      setUserPosts(userPostsFromServer);
    } catch (err) {
      setIsErrorShown(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setSelectedPost(null);
    setUserPosts(null);

    if (selectedUser) {
      loadUserPosts(selectedUser.id);
    }
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
                  onUserSelect={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isErrorShown && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userPosts?.length === 0 && !isErrorShown && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userPosts && !isLoading && !isErrorShown && (
                  <PostsList
                    userPosts={userPosts}
                    selectedPost={selectedPost}
                    onPostSelect={setSelectedPost}
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
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                userPost={selectedPost}
                isFormVisible={isFormVisible}
                setIsFormVisible={setIsFormVisible}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
