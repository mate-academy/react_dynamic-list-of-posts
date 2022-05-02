import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/api';
import { Loader } from './components/Loader/Loader';

type Props = {
  userId: number;
};

const App: React.FC<Props> = () => {
  const [userId, setUserId] = useState('0');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setLoading(true);
  };

  useEffect(() => {
    getUserPosts(userId).then(res => {
      setPosts(res);
      setLoading(false);
    });
  }, [userId]);

  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={selectHandler}>
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {isLoading ? <Loader />
            : (
              <PostsList
                posts={posts}
                setSelectedPostId={setSelectedPostId}
                selectedPostId={selectedPostId}
              />
            )}
        </div>

        <div className="App__content">
          {selectedPost
            && (
              <PostDetails
                post={selectedPost}
                selectedPostId={selectedPostId}
              />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
