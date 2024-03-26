import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './api/users';
import { getPosts } from './api/post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isError, setIsError] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);

  const noPosts = !posts.length && selectedUser && !loadingPosts && !isError;

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setOpenedPost(null);
      setPosts([]);
      setLoadingPosts(true);

      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => setIsError(true))
        .finally(() => setLoadingPosts(false));
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
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingPosts && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts.length && (
                  <PostsList
                    posts={posts}
                    openedPost={openedPost}
                    setOpenedPost={setOpenedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': openedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {openedPost && <PostDetails post={openedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
