import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/api';

const App = () => {
  const [selectedUserId, setSelectedUserId] = useState('0');

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const [postId, setPostId] = useState('');

  const getDataFromServer = async(dataType) => {
    const data = await getUserPosts(dataType);

    switch (dataType) {
      case 'posts':
        setPosts(data);
        break;
      case 'users':
        setUsers(data);
        break;
      default:
        setComments(data);
    }
  };

  useEffect(() => {
    getDataFromServer('posts');
    getDataFromServer('users');
    getDataFromServer('comments');
  }, []);

  const showPostInfo = (event) => {
    if (event.target.value === postId) {
      setPostId('');
    } else {
      setPostId(event.target.value);
    }
  };

  const selectedPost = posts.find(post => post.id === +postId);
  const commentsFromSelectedPosts = comments
    .filter(comment => comment.postId === +postId);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={event => setSelectedUserId(event.target.value)}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            select={selectedUserId}
            posts={posts}
            showPostInfo={showPostInfo}
            postSelected={postId}
          />
        </div>

        <div className="App__content">
          <PostDetails
            postId={postId}
            {...selectedPost}
            comments={commentsFromSelectedPosts}
            loadComments={getDataFromServer}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
