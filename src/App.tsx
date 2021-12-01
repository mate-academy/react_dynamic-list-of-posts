/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllUsersPosts } from './api/api';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [selectUser, setSelectUser] = useState<string>('0');

  const loadPost = (postId: number) => {
    setPostDetails(posts.filter(post => post.id === postId)[0]);
  };

  const deletePost = () => {
    setPostDetails(null);
  };

  useEffect(() => {
    async function loadTodo() {
      const newUser = await getAllUsersPosts();

      if (selectUser !== '0') {
        const newArr = newUser.filter(item => item.userId === Number(selectUser));

        console.log(newArr);

        return setPosts(newArr);
      }

      return setPosts(newUser);
    }

    loadTodo();
  }, [selectUser]);

  return (
    <div className="App">
      <header className="App__header">
        <form onSubmit={event => event.preventDefault()}>
          <label>
            Select a user: &nbsp;

            <select
              className="App__user-selector"
              value={selectUser}
              onChange={(event) => {
                setSelectUser(event.target.value);
              }}
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
        </form>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {posts.length > 0 && (
            <PostsList
              posts={posts}
              loadPost={loadPost}
              postDetails={postDetails}
              deletePost={deletePost}
            />
          )}
        </div>

        <div className="App__content">
          {(postDetails !== null) && (
            <PostDetails
              postDetails={postDetails}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
