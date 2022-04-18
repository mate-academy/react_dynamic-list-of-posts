import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { PostsContext } from './PostsContext';
import { getUsers } from './api/users';
import { User } from './types/User';
import { Loader } from './components/Loader';

export const App: FC = () => {
  const {
    posts,
    selectedUserId,
    setSelectedUserId,
    selectedPostId,
    setSelectedPostId,
    postsIsLoading,
  } = useContext(PostsContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data));
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUserId(Number(value));
    setSelectedPostId(0);
  }, [setSelectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="user-selector"
            name="user-selector"
            value={selectedUserId}
            onChange={handleChange}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {/* eslint-disable-next-line no-nested-ternary */}
          {postsIsLoading
            ? <Loader />
            : posts.length
              ? <PostsList />
              : 'No posts found'}
        </div>

        <div className="App__content">
          {!!selectedPostId && <PostDetails />}
        </div>
      </main>
    </div>
  );
};
