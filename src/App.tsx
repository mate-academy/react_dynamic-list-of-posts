import React, {
  useState,
  useEffect,
} from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/bulma.sass';
import './App.scss';
import classNames from 'classnames';

import { UserSelector } from './components/UserSelector/UserSelector';
import { PostsList } from './components/PostsList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './services/user';
import { getPosts } from './services/post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormShowed, setIsFormShowed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    setErrorMessage('');
    if (selectedUser) {
      setIsLoading(true);
      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setIsLoading(false));
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
                  setSelectedUser={setSelectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(posts && !posts.length && !isLoading) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {(posts && posts.length > 0 && !isLoading) && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setIsFormShowed={setIsFormShowed}
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
              'Sidebar', {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  isFormShowed={isFormShowed}
                  setIsFormShowed={setIsFormShowed}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
