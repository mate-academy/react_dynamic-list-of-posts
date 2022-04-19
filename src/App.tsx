import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';
import { requestUsers } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const fetchUsers = async () => {
    const data = await requestUsers();

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
          {(!!selectedPostId) && (
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
