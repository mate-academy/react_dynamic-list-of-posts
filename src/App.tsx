import React, { useCallback, useEffect, useState } from 'react';
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
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserId, setActiveUserId] = useState(0);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isNoPosts, setNoPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersFromServer = await getUsers();

        setUsers(usersFromServer);
      } catch {
        setError(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (activeUserId !== 0) {
        setLoading(true);
        setError(false);
        setNoPosts(false);

        try {
          const postsFromServer = await getUserPosts(activeUserId);

          if (postsFromServer.length < 1) {
            setNoPosts(true);
          }

          setUserPosts(postsFromServer);
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [activeUserId]);

  const handleSelectedUser = useCallback((id: number) => {
    if (id !== activeUserId) {
      setActiveUserId(id);
      setSelectedPost(null);
    }
  }, [activeUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  activeUserId={activeUserId}
                  onUserChange={handleSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUserId && !isError && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (
                  <Loader />
                )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                { isNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!isLoading && userPosts.length > 0 && (
                  <PostsList
                    userPosts={userPosts}
                    onPostSelect={setSelectedPost}
                    selectedPostID={selectedPost?.id}
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
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};
