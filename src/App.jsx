import React, { useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { useSelector, useDispatch } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { NewPost } from './components/NewPost';
import { getPosts, selectedPostId } from './store';

const App = () => {
  const dispatch = useDispatch();
  const selectedPost = useSelector(selectedPostId);

  function fetchPosts() {
    dispatch(getPosts());
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <header className="App__header App__form-wrapper">
        <NewPost />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        {!!selectedPost && (
        <div className="App__content">
          <PostDetails
            postId={selectedPost}
            fetchPosts={fetchPosts}
          />
        </div>
        )}

      </main>
    </div>
  );
};

export default App;
