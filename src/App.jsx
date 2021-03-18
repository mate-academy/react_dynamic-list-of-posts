import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts } from './helpers';

const App = () => {
  const [postsFromServer, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [chosenId, setNewId] = useState('0');
  const [comments, setComments] = useState([]);
  const [choosenPost, setchoosenPost] = useState(null);

  useEffect(async() => {
    const postsAll = await getPosts();

    setAllPosts(postsAll);
    setPosts(postsAll);
    setAllPosts(postsAll);
  }, []);

  useEffect(() => {
    if (+chosenId === 0) {
      setPosts(postsFromServer);
    } else {
      setPosts(postsFromServer.filter(post => post.userId === +chosenId));
    }
  }, [chosenId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              setNewId(event.target.value);
            }
            }
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
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            setComments={setComments}
            setchoosenPost={setchoosenPost}
          />
        </div>

        <div className="App__content">
          {choosenPost && (
          <PostDetails
            post={choosenPost}
            comments={comments}
            commentsUpdate={setComments}
          />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
