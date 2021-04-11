import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/api';
import { getAllPosts } from './api/posts';

export const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [userSelect, setUserSelect] = useState('0');
  const [posts, setPosts] = useState([]);
  const [filterPosts, setFilterPosts] = useState(posts);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    getUsers()
      .then((people) => {
        setUsers(people
          .filter(person => person.id < 10)
          .sort((a, b) => a.id - b.id));
      });

    getAllPosts()
      .then((post) => {
        setPosts(post);
        setFilterPosts(post);
      });
  }, []);

  const selectUserId = useCallback((numberID, person) => {
    setUserId(numberID);
    setUser(person);
  }, []);

  const filterByPosts = (number) => {
    if (number === '0') {
      setFilterPosts(posts.map(post => post));

      return;
    }

    setFilterPosts(posts.filter(post => +post.userId === +number));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            name="user"
            value={userSelect}
            onChange={({ target }) => {
              setUserSelect(target.value);
              filterByPosts(target.value);
            }}
          >
            <option value="0">All users</option>
            {users.map(person => (
              <option
                key={person.id}
                value={person.id}
              >
                {person.name}
              </option>
            ))}

          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            filterPosts={filterPosts}
            selectUserId={selectUserId}
            userId={userId}
          />
        </div>
        {userId !== 0 && (
        <div className="App__content">
          <PostDetails
            userId={userId}
            post={user}
          />
        </div>
        )}
      </main>
    </div>
  );
};
