import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorNoPosts, setErrorNoPosts] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getUserPosts = useCallback(async (): Promise<void> => {
    if (!selectedUser) {
      return;
    }

    try {
      setLoading(true);
      setError(false);
      setErrorNoPosts(false);
      setPosts([]);
      const dataPosts = (await client.get(
        `/posts?userId=${selectedUser.id}`,
      )) as Post[];

      if (dataPosts.length === 0) {
        setErrorNoPosts(true);
      } else {
        setErrorNoPosts(false);
      }

      setPosts(dataPosts as Post[]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser !== null) {
      setSelectedPost(null);
      getUserPosts();
    }
  }, [selectedUser, getUserPosts]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = (await client.get('/users')) as User[];

        setUsers(fetchedUsers);
      } catch {
      }
    };

    fetchUsers();
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
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser === null ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : null}
                {loading ? <Loader /> : null}

                {error ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                ) : (
                  errorNoPosts && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )
                )}

                {selectedUser && posts.length > 0 && (
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
              {
                'Sidebar--open': selectedPost !== null,
                'Sidebar--closed': selectedPost === null,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost !== null ? (
                <PostDetails selectedPost={selectedPost} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
