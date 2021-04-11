import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getPosts, getComments } from './api/post';

const App = () => {
  const [selectedPost, setPostDetail] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [posts, loadPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const postsFromServer = await getPosts('/posts');

      loadPosts(postsFromServer);
    };

    fetchData();
  }, [posts]);

  useEffect(() => {
    async function fetchData() {
      const fetchComment = await getComments(selectedPost);

      setComments(fetchComment);
    }

    fetchData();
  }, []);

  const updateComments = useCallback(setComments, []);

  const selectPostDetail = (postId) => {
    setPostDetail(postId);
  };

  const selectPostTitle = (title) => {
    setPostTitle(title);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector">
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
            onSelectPostDetail={selectPostDetail}
            onSelectPostTitle={selectPostTitle}
            selectedPost={selectedPost}
          />
        </div>

        {selectedPost && (
          <div className="App__content">
            <PostDetails
              selectedPost={selectedPost}
              comments={comments}
              updateComments={updateComments}
              postTitle={postTitle}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
