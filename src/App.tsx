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
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await client.get<User[]>('/users');

        setUsers(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Erro ao carregar usuarios', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);
      setSelectedPost(null);
      setErrorMessage(null);
      setLoadingPost(false);

      return;
    }

    const loadPosts = async () => {
      setLoadingPost(true);
      setErrorMessage(null);
      try {
        const data = await client.get<Post[]>(
          `/posts?userId=${selectedUser.id}`,
        );

        setPosts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Erro ao carregar posts', error);
        setErrorMessage('Erro ao carregar posts');
      } finally {
        setLoadingPost(false);
      }
    };

    loadPosts();
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {!loading && (
                  <UserSelector
                    users={users}
                    selectedUserId={selectedUser?.id ?? null}
                    onSelect={id => {
                      if (id !== null) {
                        const user = users.find(u => u.id === id) || null;

                        setSelectedUser(user);
                      }
                    }}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {loading && <Loader />}

                {!loading && !selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && loadingPost && <Loader />}

                {selectedUser && errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {selectedUser && !loadingPost && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {selectedUser && !loadingPost && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onOpenPost={post => setSelectedPost(post)}
                    onClosePost={() => setSelectedPost(null)}
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
              { 'Sidebar--open': !!selectedPost },
            )}
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
