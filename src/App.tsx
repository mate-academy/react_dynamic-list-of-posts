import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isNoPosts, setIsNoPosts] = useState(false);
  const [isSideBar, setIsSideBar] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [hasCommentForm, setHasCommentForm] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users')
      .then(setUsers)
      .catch(() => setHasError(true));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      setIsNoPosts(false);
      setIsSideBar(false);

      client.get<Post[]>(`/posts?userId=${selectedUser.id}`)
        .then(posts => {
          if (posts.length === 0) {
            setIsNoPosts(true);
          }

          setUserPosts(posts);
        })
        .catch(() => setHasError(true))
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
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {isLoading && <Loader />}
                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {isNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {!isLoading && (
                  <PostsList
                    isSideBar={isSideBar}
                    setIsSideBar={setIsSideBar}
                    userPosts={userPosts}
                    currentPost={currentPost}
                    setCurrentPost={setCurrentPost}
                    setHasCommentForm={setHasCommentForm}
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
              { 'Sidebar--open': isSideBar },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                currentPost={currentPost}
                hasCommentForm={hasCommentForm}
                setHasCommentForm={setHasCommentForm}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
