/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const selectPost = (postId:number) => {
    setSelectedPostId(postId);
  };

  const loadPosts = (userId:number) => {
    getUserPosts(userId).then(loadedPosts => setPosts(loadedPosts));
  };

  useEffect(() => loadPosts(0), []);

  const selectHandler = (event:React.ChangeEvent<HTMLSelectElement>) => {
    loadPosts(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={selectHandler}
          >
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
          <PostsList
            posts={posts}
            selectPost={selectPost}
            selectedPost={selectedPostId}
          />
        </div>

        <div className="App__content">
          {Boolean(selectedPostId) && (<PostDetails selectedPostId={selectedPostId} />)}
        </div>
      </main>
    </div>
  );
};

export default App;
