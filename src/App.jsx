import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/api';

const App = () => {
  const [select, changeSelect] = useState('0');

  const [users, createUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const [postId, changePostId] = useState('');

  const createList = async() => {
    setPosts(await getUserPosts('posts'));
  };

  const loadUsers = async() => {
    createUsers(await getUserPosts('users'));
  };

  const loadComments = async() => {
    setComments(await getUserPosts('comments'));
  };

  useEffect(() => {
    loadUsers();
    createList();
    loadComments();
  }, [comments]);

  const showPostInfo = (event) => {
    if (event.target.value === postId) {
      changePostId('');
    } else {
      changePostId(event.target.value);
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
            value={select}
            onChange={event => changeSelect(event.target.value)}
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
            select={select}
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
          />
        </div>
      </main>
    </div>
  );
};

export default App;
