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
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getSelectedUser = (user: User) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const loadUsers = async () => {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      if (!selectedUser) {
        return;
      }

      try {
        setIsLoading(true);
        const selectedUserPosts = await getPosts(selectedUser?.id);

        setPosts(selectedUserPosts);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    setSelectedPost(null);
    loadPosts();
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
                  getSelectedUser={getSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser
                  ? (
                    <>
                      {isLoading && <Loader />}

                      {error && (
                        <div
                          className="notification is-danger"
                          data-cy="PostsLoadingError"
                        >
                          Something went wrong!
                        </div>
                      )}

                      {posts.length
                        ? (
                          <PostsList
                            posts={posts}
                            selectedPost={selectedPost}
                            setSelectedPost={setSelectedPost}
                          />
                        )
                        : (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        )}
                    </>
                  )
                  : (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
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
              {
                'Sidebar--open': !!selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails selectedPost={selectedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
