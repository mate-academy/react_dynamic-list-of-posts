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
import { getPosts, getUsers } from './api/api';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPostsVisible, setPostsVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const fetchingUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(response);
    } catch (error) {
      setError(true);
    }
  };

  const fetchingPosts = async () => {
    if (!selectedUser) {
      return;
    }

    setPostsVisible(false);
    setLoading(true);

    try {
      const response = await getPosts(selectedUser.id);

      setPosts(response);
      setPostsVisible(true);
    } catch (error) {
      setPostsVisible(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingUsers();
  }, []);

  useEffect(() => {
    fetchingPosts();
  }, [selectedUser]);

  const onChangeUser = (user: User) => {
    setSelectedUser(user);
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
                  user={selectedUser}
                  onChangeUser={onChangeUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isLoading && <Loader />}

                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isPostsVisible && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id || 0}
                    onPost={setSelectedPost}
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
              <PostDetails
                postDetail={selectedPost}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
