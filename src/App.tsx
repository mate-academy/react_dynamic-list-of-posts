import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './services/user';
import { Loader } from './components/Loader';
import { getPosts } from './services/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingPostsError, setLoadingPostsError] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setLoadingPostsError(true);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoadingPosts(true);
      setPosts([]);
      setLoadingPosts(false);
    }
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  const handlePostSelected = (postr: Post | null) => {
    setSelectedPost(postr);
  };

  const getPostsFromServer = (selected: User | null) => {
    if (!selected) {
      return;
    }

    setSelectedPost(null);
    setLoadingPosts(true);

    getPosts(selected.id)
      .then(setPosts)
      .catch(() => setLoadingPostsError(true))
      .finally(() => setLoadingPosts(false));
  };

  useEffect(() => {
    if (selectedUser) {
      setLoadingPostsError(false);
      getPostsFromServer(selectedUser);
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
                  handleUserSelect={handleUserSelect}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {loadingPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  <>
                    {loadingPosts && <Loader />}
                    {!loadingPosts && posts && posts.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}
                    {!loadingPosts && posts && posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        selectedPost={selectedPost}
                        handlePostSelected={handlePostSelected}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {selectedPost && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                {selectedPost && <PostDetails selectedPost={selectedPost} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
