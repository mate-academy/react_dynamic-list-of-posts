import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';
import { getComments } from './api/comments';
// start

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentsToRender, setCommentsToRender] = useState([]);
  const [selectedUser, selectUser] = useState('All');
  const [selectedPost, selectPost] = useState(null);

  // eslint-disable-next-line no-console
  console.log('App');

  useEffect(() => {
    const fetchData = async() => {
      const [usersFromServer, commentsFromServer] = await Promise
        .all([getUsers(), getComments()]);

      setUsers(usersFromServer);
      setComments(commentsFromServer);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await getUserPosts(selectedUser);

      setPosts(response);
    };

    fetchPosts();
  }, [selectedUser]);

  useEffect(() => {
    const fiterComments = (postId) => {
      const filteredComments = comments
        .filter(comment => comment.postId === +postId);

      setCommentsToRender(filteredComments);
    };

    fiterComments(selectedPost);
  }, [selectedPost, comments]);

  const updateComments = async() => {
    const updated = await getComments();

    setComments(updated);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            value={selectedUser}
            className="App__user-selector"
            onChange={event => selectUser(event.target.value)}
          >
            <option value="All">All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">

          <PostsList
            posts={posts}
            selectPost={selectPost}
            selectedPost={selectedPost}
          />
        </div>

        <div className="App__content">
          {selectedPost
            ? (
              <PostDetails
                postId={selectedPost}
                comments={commentsToRender}
                handleUpdateComments={updateComments}
              />
            )
            : 'Select post'}
        </div>
      </main>
    </div>
  );
};

export default App;
