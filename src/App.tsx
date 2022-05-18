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
  const [isLoadPost, setIsLoadPost] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const changeIsClicked = (val: boolean) => {
    setIsClicked(val);
  };

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .then(() => {
        setIsLoadPost(false);
      });
  }, []);

  useEffect(() => {
    getUserPosts(userId)
      .then(setPosts)
      .then(() => {
        setIsLoadPost(false);
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
              setIsLoadPost(true);
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
            isLoadPost={isLoadPost}
            changeIsClicked={changeIsClicked}
          />
        </div>

        <div className="App__content">
          {postId !== 0
            && (
              <PostDetails
                postId={postId}
                isClicked={isClicked}
                changeIsClicked={changeIsClicked}
              />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
