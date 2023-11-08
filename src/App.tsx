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
import { getPosts, getUsers } from './api/services';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const selectUserHandler = (user: User) => {
    setSelectedUser(user);
  };

  const selectPostHandler = (post: Post) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    setError(false);

    const loadUserFromServer = async () => {
      try {
        const usersFromServer = await getUsers();

        setUsers(usersFromServer);
      } catch {
        setError(true);
      }
    };

    loadUserFromServer();
  }, []);

  const loadPostsFromServer = async (selected: User | null) => {
    if (!selected) {
      return;
    }

    setSelectedPost(null);

    setLoading(true);

    try {
      const postsFromServer = await getPosts(selected.id);

      setPosts(postsFromServer);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      setError(false);
      loadPostsFromServer(selectedUser);
    }
  }, [selectedUser]);

  const toRenderPostsList = (selectedUser && posts?.length !== 0 && !loading);
  const toRenderNoPostsYet = (posts?.length === 0 && selectedUser && !loading);
  const toRenderNoSelectedUser = (!selectedUser && !loading);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  userSelector={selectUserHandler}
                  selectedUser={selectedUser}
                  users={users}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {loading && <Loader />}
                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {Boolean(toRenderNoSelectedUser)
                  && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )}

                {Boolean(toRenderPostsList)
                  && (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      postSelector={selectPostHandler}
                    />
                  )}

                {Boolean(toRenderNoPostsYet)
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost
                && (
                  <PostDetails
                    selectedPost={selectedPost}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
