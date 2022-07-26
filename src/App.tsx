import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { getAllPosts, getUserPosts } from './api/api';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [checkedPost, setCheckedPost] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setLoading(true);
  };

  const postIdHandler = (postIdChoose: number | null) => {
    setSelectedPostId(postIdChoose);
    setCheckedPost(prevState => !prevState);
  };

  useEffect(() => {
    const retrievePosts = async () => {
      let result;

      if (userId === 0) {
        result = await getAllPosts();
      } else {
        result = await getUserPosts(userId);
      }

      setLoading(false);
      setPosts(result);
    };

    retrievePosts();
  }, [posts]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={handleUserChange}>
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
          {loading && <Loader />}
          <PostsList
            posts={posts}
            postIdHandler={postIdHandler}
            choosePost={selectedPostId}
          />
        </div>
        {checkedPost && (
          <div className="App__content">
            <PostDetails postId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
