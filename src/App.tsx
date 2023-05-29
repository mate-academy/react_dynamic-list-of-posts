import { useEffect, useState } from 'react';
import classNames from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import './App.scss';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { useItems } from './hooks/useItems';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const {
    setErrorMsg, handleItemsFetch, loading, errorMsg, items: posts,
  }
    = useItems<Post[]>('/posts?userId=');

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setErrorMsg('Unable to load users - reload'));
  }, []);

  const handleUserSelect = async (user: User) => {
    if (user.id === selectedUser?.id) {
      return;
    }

    setSelectedUser(null);

    handleItemsFetch('Unable to fetch Posts', user.id);

    setSelectedUser(user);
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
                {!selectedUser && !errorMsg && (
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
                    <PostsList
                      posts={posts}
                      setSelectedPost={setSelectedPost}
                      selectedPostId={selectedPost?.id}
                    />
                  ))}
              </div>
            </div>
          </div>

          { selectedUser && (
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
                <PostDetails selectedPost={selectedPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
