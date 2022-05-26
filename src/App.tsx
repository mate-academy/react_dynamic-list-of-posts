import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';
import { Post } from './types/Post';
import { getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const getPosts = useCallback(async () => {
    const userPosts = await getUserPosts(userId);

    setPosts(userPosts);
  }, [userId]);

  useEffect(() => {
    setSelectedPostId(selectedPostId);
    getPosts();
  }, [userId, selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          setUserId={setUserId}
          setSelectedPostId={setSelectedPostId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId && <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
