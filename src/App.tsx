import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPostDetails, getUserPosts } from './api/posts';

const App: React.FC = () => {
  const startPostValue = {
    id: 0,
    title: '',
    userId: 0,
    body: '',
  };

  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>(startPostValue);

  const loadPosts = (userId: number) => {
    getUserPosts(userId).then(response => setPosts(response));
  };

  const loadPost = (id: number) => {
    if (post?.id !== id) {
      getPostDetails(id).then(response => setPost(response));
    }

    setPost(startPostValue);
  };

  useEffect(() => {
    loadPosts(0);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="first-name">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => (loadPosts(Number(event.target.value)))}
            name="select"
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
            loadPost={loadPost}
            selctedPostId={post.id}
          />
        </div>

        <div className="App__content">
          {post.id ? <PostDetails post={post} /> : 'Please celect post'}
        </div>
      </main>
    </div>
  );
};

export default App;
