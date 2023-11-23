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
import { getAllUsers, getUserPosts } from './utils/api';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loaderActive, setLoadedActive] = useState(false);
  const [noPostsWarning, setNoPostsWarning] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoadedActive(true);

    getAllUsers()
      .then(setUsers)
      .catch(() => setError(true))
      .finally(() => {
        setLoadedActive(false);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  }, []);

  useEffect(() => {
    setError(false);
    setLoadedActive(true);
    setNoPostsWarning(false);

    if (!selectedUserId) {
      setVisiblePosts([]);

      return;
    }

    getUserPosts(selectedUserId as number)
      .then((response: Post[]) => {
        setVisiblePosts(response);

        if (!response.length && selectedUserId) {
          setNoPostsWarning(true);
        } else {
          setNoPostsWarning(false);
        }
      })
      .catch(() => {
        setNoPostsWarning(false);
        setError(true);
      })
      .finally(() => {
        setLoadedActive(false);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div
                className="block"
                data-cy="MainContent"
              >
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {selectedUserId && loaderActive ? <Loader /> : (
                  <>
                    {selectedUserId && visiblePosts.length > 0 && (
                      <PostsList
                        posts={visiblePosts}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                      />
                    )}
                  </>
                )}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostsWarning && (
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
            className={cn({
              tile: true,
              'is-parent': true,
              'is-8-desktop': true,
              Sidebar: true,
              'Sidebar--open': selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
