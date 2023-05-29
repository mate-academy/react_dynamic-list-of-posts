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

type UsersMap = {
  [key: number]: User;
};

type SelectedUser = User & {
  posts: Post[] | null
};

export const App = () => {
  const [usersMap, setUsersMap] = useState<UsersMap>({});
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then((data) => setUsersMap(data.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: { ...curr } }), {},
      )))
      .catch(() => setErrorMsg('Unable to load users - reload'));
  }, []);

  const handlePostsFetch = async (userId: number) => {
    try {
      return await client.get<Post[]>(`/posts?userId=${userId}`);
    } catch {
      setErrorMsg('Unable to load posts');

      return null;
    }
  };

  const handleUserSelect = async (id: number) => {
    setErrorMsg('');
    setLoading(true);
    setSelectedUser(null);

    const posts = await handlePostsFetch(id);

    setSelectedUser({ posts, ...usersMap[id] });
    setLoading(false);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={Object.values(usersMap)}
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

                {selectedUser
                  && (selectedUser?.posts?.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList posts={selectedUser?.posts} />
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
