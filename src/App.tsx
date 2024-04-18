import React, { useEffect, useRef, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as clientService from './api/posts';
import { Post } from './types/Post';
import { User } from './types/User';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUser] = useState<User[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [isCommenting, setIsCommenting] = useState(false);
  const isFirstRender = useRef(true);

  function loadPosts() {
    setLoader(true);
    clientService
      .getPosts(userId)
      .then(setPosts)
      .catch(e => {
        setError(e);
      })
      .finally(() => setLoader(false));
    // .catch(() => setErrorMasage(Errors.cantGetPeople));
  }

  function loadUsers() {
    getUsers().then(setUser);
  }

  useEffect(loadUsers, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    return loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  userId={userId}
                  setUserId={setUserId}
                  setSelectedPost={setSelectedPost}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {loader ? (
                  <Loader />
                ) : !!error ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                ) : !userId ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : !posts.length ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setIsCommenting={setIsCommenting}
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
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  isCommenting={isCommenting}
                  setIsCommenting={setIsCommenting}
                  post={selectedPost}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
