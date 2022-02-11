import { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UsersSelect';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [users, setUsers] = useState<User[] | null>(null);

  async function loadUsers() {
    const usersFromServer = await getUsers();

    setUsers([...usersFromServer]);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const selectPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  const clearPostId = () => {
    setSelectedPostId(0);
  };

  const selectUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));

    clearPostId();
  };

  return (
    <div className="App">
      <header className="App__header">
        {users
          && (
            <UserSelect
              users={users}
              onSelectUserId={selectUserId}
              selectedUserId={selectedUserId}
            />
          )}
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
            onOpenPostDetails={selectPostId}
            onClearPostDetails={clearPostId}
          />
        </div>
        <div className="App__content">
          {selectedPostId
            ? <PostDetails selectedPostId={selectedPostId} />
            : (
              <div className="PostDetails">
                <section className="PostDetails__post post-unopened">
                  <p>Please open the post to see details</p>
                </section>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
