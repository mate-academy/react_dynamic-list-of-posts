import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';
import { BASE_URL } from './api/api';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const fetchUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(`Status: ${response.status}
        - StatusText: ${response.statusText}`);
    }

    const data = await response.json();

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          users={users}
          onUserSelect={setSelectedUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            userId={selectedUserId}
            onPostsSet={setPosts}
            onPostId={setSelectedPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {(selectedPostId > 0) && (
            <PostDetails
              postId={selectedPostId}
              onCommentsSet={setComments}
              comments={comments}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
