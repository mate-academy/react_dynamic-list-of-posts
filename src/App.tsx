import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { getData } from './api/fetch';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [catchError, setCatchError] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [emptyPosts, setEmptyPosts] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const url = '/users';
      const currentUsers = await getData<User>(url);

      setUsers(currentUsers);
    } catch {
      setCatchError(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setCatchError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setPosts([]);
    setEmptyPosts(false);

    if (users && userId) {
      const fetchPosts = async () => {
        try {
          setIsLoading(true);
          const url = `/posts?userId=${userId}`;

          if (userId) {
            const currentPosts = await getData<Post>(url);

            if (currentPosts.length === 0) {
              setEmptyPosts(true);
            }

            setPosts(currentPosts);
          }
        } catch {
          setCatchError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPosts();
    }
  }, [users, userId]);

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
                {!userId && <p data-cy="NoSelectedUser">No user selected</p>}

                {isLoading && <Loader />}

                {catchError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {emptyPosts && posts.length === 0 && userId && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userId && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
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
                <PostDetails posts={posts} selectedPost={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
