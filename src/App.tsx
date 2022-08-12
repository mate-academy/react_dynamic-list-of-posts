import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts } from './api/posts';

const App: React.FC = () => {
  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);

  const [selectedPostId, setSelectedPostId] = useState(-1);

  const [selectedUserId, setSelectedUserId] = useState(0);

  const getVisibleListOfPosts = () => {
    if (selectedUserId === 0) {
      return listOfPosts;
    }

    return listOfPosts
      .filter(post => post.userId === selectedUserId);
  };

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  const openPost = async (postId: number) => {
    if (postId === selectedPostId) {
      setSelectedPostId(-1);

      return;
    }

    setSelectedPostId(postId);
  };

  useEffect(() => {
    getPosts().then(result => {
      setListOfPosts(result);
    });
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={selectUser}
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
            posts={getVisibleListOfPosts()}
            selectedId={selectedPostId}
            openPost={openPost}
          />
        </div>

        <div className="App__content">
          {
            selectedPostId > 0
              ? (
                <PostDetails
                  postId={selectedPostId}
                />
              )
              : (
                <p className="PostDetailsHint">
                  Please, select post to see details
                </p>
              )
          }
        </div>
      </main>
    </div>
  );
};

export default App;
