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
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(usersFromServer => setUsers(usersFromServer));
  }, []);

  const fetchPosts = async (userId: number) => {
    try {
      setSelectedId(userId);
      setLoading(true);
      setPosts([]);
      setSelectedPostId(null);

      const postsFromServer = await client.get<Post[]>(
        `/posts?userId=${userId}`,
      );

      setPosts(postsFromServer);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      setActive(false);
    }
  };

  const handlePostSelecting = (id: number) => {
    if (selectedPostId === id) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(id);
    }
  };

  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    <main className="section" onClick={() => setActive(false)}>
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelect={fetchPosts}
                  selectedId={selectedId}
                  active={active}
                  setActive={setActive}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts.length === 0 && selectedId && !loading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && !loading && (
                  <PostsList
                    posts={posts}
                    onSelect={handlePostSelecting}
                    selectedPostId={selectedPostId}
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
              { 'Sidebar--open': selectedPostId },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
