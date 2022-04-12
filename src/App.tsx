import React, {
  ChangeEvent,
  useCallback, useEffect, useState,
} from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';
import { User } from './types/User';
import { Post } from './types/Post';
import { Header } from './components/Header/Header';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => setUsers(usersFromServer));

    getUserPosts(selectedUserId)
      .then(setPosts);
  }, [selectedUserId]);

  const handleUserSelect = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
  }, [setSelectedUserId]);

  const handlePostSelect = useCallback((postId: number) => () => {
    setSelectedPostId(postId);
  }, []);

  return (
    <div className="App">
      <Header
        users={users}
        selectedUserId={selectedUserId}
        onChangeUser={handleUserSelect}
      />

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            onSelect={handlePostSelect}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {!!selectedPostId && <PostDetails postId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
