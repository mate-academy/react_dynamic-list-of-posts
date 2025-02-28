import classNames from 'classnames';
import { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { Post } from './types/Post';
import { User } from './types/User';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(res => setUsers(res))
      .catch(() => {
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    if (selectedUserId !== null) {
      setLoading(true);
      setSelectedPost(null);

      client
        .get<Post[]>(`/posts?userId=${selectedUserId}`)
        .then(res => {
          setPosts(res);
        })
        .catch(() => setIsError(true))
        .finally(() => setLoading(false));
    }
  }, [selectedUserId]);

  const showNoSelectedUser = selectedUserId === null;
  const showNoPosts =
    !loading && !isError && selectedUserId && posts.length === 0;
  const showPost = !loading && !isError && selectedUserId && posts.length > 0;
  const showSidebar = selectedPost !== null;

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
                />
              </div>

              <div className="block" data-cy="MainContent">
                {showNoSelectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPost && (
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
              { 'Sidebar--open': showSidebar },
            )}
          >
            <div className="tile is-child box is-success ">
              {showSidebar && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
