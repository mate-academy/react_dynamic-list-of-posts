/* eslint-disable @typescript-eslint/indent */
import { FC, useEffect, useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './services/user';
import { Post } from './types/Post';
import { getPostsByUserId } from './services/posts';
import classNames from 'classnames';

export const App: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [postError, setPostError] = useState<boolean>(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);

  const selectedPost = useMemo(
    () => userPosts.find(post => post.id === selectedPostId),
    [selectedPostId, userPosts],
  );

  const setSelectUser = (user: User) => {
    setSelectedUser(user);
    setUserPosts([]);
  };

  const setSelectPostId = (id: number | null) => {
    setSelectedPostId(id);
  };

  useEffect(() => {
    if (selectedUser) {
      setIsLoadingPosts(true);
      setPostError(false);
      getPostsByUserId(selectedUser.id)
        .then(setUserPosts)
        .catch(() => setPostError(true))
        .finally(() => setIsLoadingPosts(false));
    } else {
      setUserPosts([]);
    }
  }, [selectedUser]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

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
                  setSelectUser={setSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {!!userPosts.length && !isLoadingPosts && (
                  <PostsList
                    userPosts={userPosts}
                    setSelectPostId={setSelectPostId}
                    selectedPostId={selectedPostId}
                  />
                )}

                {!isLoadingPosts &&
                  !userPosts.length &&
                  !postError &&
                  selectedUser && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {postError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
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
              { 'Sidebar--open': selectedPost !== undefined },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
