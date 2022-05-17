import React, { useState, useEffect } from 'react';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';

import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [postId, setPostId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [loadPost, setLoadPost] = useState(true);
  const [toggleComments, setToggleComments] = useState(false);

  const toggleCommentsChahgeHandler = (value: boolean) => {
    setToggleComments(value);
  };

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .then(() => {
        setLoadPost(false);
      });
  }, []);

  useEffect(() => {
    getUserPosts(userId)
      .then(setPosts)
      .then(() => {
        setLoadPost(false);
      });
  }, [userId]);

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const changePostId = (post: Post, id: number) => {
    setPostId(postId === post.id ? 0 : id);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={(event) => {
              changeUser(event);
              setLoadPost(true);
            }}
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
            posts={posts}
            postId={postId}
            changePostId={changePostId}
            loadPost={loadPost}
            toggleCommentsChahgeHandler={toggleCommentsChahgeHandler}
          />
        </div>

        <div className="App__content">
          {postId !== 0
            && (
              <PostDetails
                postId={postId}
                toggleComments={toggleComments}
                toggleCommentsChahgeHandler={toggleCommentsChahgeHandler}
              />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
