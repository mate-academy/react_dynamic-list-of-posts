import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Select } from './components/Select/Select';
import { getAllPosts } from './api/posts';
import { getAllUsers } from './api/users';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialPosts, setInitialPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPost, setSelectedPost] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const postsFromServer = await getAllPosts();
      const usersFromServer = await getAllUsers();

      setIsLoading(false);
      setInitialPosts(postsFromServer);
      setPosts(postsFromServer);
      setUsers(usersFromServer);
    }

    fetchData();
  }, []);

  const selectUser = ({ target }) => {
    if (+target.value === 0) {
      return setPosts(initialPosts);
    }

    const selectedUserPosts = initialPosts
      .filter(({ userId }) => +target.value === userId);

    return setPosts(selectedUserPosts);
  };

  const showPostDetails = (post) => {
    if (post.id === selectedPost.id) {
      setSelectedPost(false);

      return;
    }

    setSelectedPost(post);
  };

  return (
    <div className="App">
      <header className="App__header">
        <Select
          users={users}
          selectUser={selectUser}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            isLoading={isLoading}
            showPostDetails={showPostDetails}
            selectedPostId={selectedPost.id}
          />
        </div>

        {selectedPost && (
          <div className="App__content">
            <PostDetails post={selectedPost} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
