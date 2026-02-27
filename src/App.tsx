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
import { getUsers } from './api/user';
import { Post } from './types/Post';
import { getPosts } from './api/post';
import { ErrorMessage } from './types/ErrorMessage';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.None,
  );
  const [dropdownStatus, setDropdownStatus] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setLoader(true);
    setErrorMessage(ErrorMessage.None);

    getPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setErrorMessage(ErrorMessage.GetMethodError))
      .finally(() => {
        setLoader(false);
      });
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setPosts([]);
    setSelectedPost(null);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  dropdownStatus={dropdownStatus}
                  setDropdownStatus={setDropdownStatus}
                  selectedUser={selectedUser}
                  handleUserSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser !== null && (
                  <>
                    {loader && <Loader />}

                    {!loader && errorMessage !== '' && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {errorMessage}
                      </div>
                    )}

                    {!loader && errorMessage === '' && posts.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!loader && errorMessage === '' && posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                      />
                    )}
                  </>
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            {selectedPost !== null && (
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
