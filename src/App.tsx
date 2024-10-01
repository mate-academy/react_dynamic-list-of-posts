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
import { userClient } from './utils/userClient';
import { postClient } from './utils/postClient';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [userSelPosts, setUserSelPosts] = useState<Post[]>([]);
  const [openedPost, setOpendPost] = useState<Post | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    userClient
      .getAll()
      .then(res => {
        setUsers(res);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setOpendPost(null);

    if (userSelected) {
      setLoading(true);
      postClient
        .get(userSelected.id)
        .then(res => {
          setUserSelPosts(() => res);
          setError(false);
        })
        .catch(() => setError(true))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userSelected]);

  const handleUserSelect = (user: User) => {
    setUserSelected(user);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} onSelect={handleUserSelect} />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelected && (
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

                {userSelected && !loading ? (
                  userSelPosts.length > 0 ? (
                    <PostsList
                      posts={userSelPosts}
                      openedPost={openedPost}
                      onOpen={setOpendPost}
                    />
                  ) : (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )
                ) : undefined}
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
              { 'Sidebar--close': !openedPost, 'Sidebar--open': openedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails post={openedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
