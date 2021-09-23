import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { UserSelect } from './components/UserSelect/UserSelect';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [isPostDetailsVisible, setIsPostDetailsVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const postsFromServer = await getUserPosts(selectedUser);

      setPosts(postsFromServer);
    })();
  }, [selectedUser]);

  const changePostUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUser(+value);
  };

  useEffect(() => {
    if (selectedPostId === 0) {
      setIsPostDetailsVisible(false);
    } else {
      setIsPostDetailsVisible(true);
    }
  }, [selectedPostId]);

  const changeSelectedPostId = (postId: number) => {
    if (postId === selectedPostId) {
      setSelectedPostId(0);
    } else {
      setSelectedPostId(postId);
    }
  };

  return (
    <div className="App">
      <div>{selectedPostId}</div>
      <header className="App__header">
        <UserSelect
          onChange={changePostUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            onChangePostId={changeSelectedPostId}
          />
        </div>

        <div className="App__content">
          {isPostDetailsVisible && (
            <PostDetails />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
