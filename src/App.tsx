import { useEffect, useState } from 'react';
// import classNames from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

import { PostsList } from './components/PostsList';
// import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import './App.scss';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then((data) => setUsers(data))
      .catch(() => setErrorMsg('Unable to load users - reload'));
  }, []);

  const handlePostsFetch = (userId: number) => {
    client
      .get<Post[]>(`/posts?userId=${userId}`)
      .then((data) => setPosts(data))
      .catch(() => setErrorMsg('Unable to load posts'))
      .finally(() => setLoading(false));
  };

  const handleUserSelect = (id: number) => {
    setErrorMsg('');
    setLoading(true);
    setPosts(null);
    setSelectedUser(users.find((user) => user.id === id) ?? null);

    handlePostsFetch(id);
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
                  setSelectedUser={handleUserSelect}
                  selectedUserName={selectedUser?.name}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {errorMsg && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMsg}
                  </div>
                )}

                {posts
                  && (posts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList posts={posts} />
                  ))}
              </div>
            </div>
          </div>

          {/* <div
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
              <PostDetails />
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};
