/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/posts';
import { Post } from './types/Post';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const initialPosts: Post[] = [];
  const [userPosts, setUserPosts] = useState(initialPosts);
  const [isLoading, setLoading] = useState(false);
  const [selectedPostId, selectPost] = useState(0);

  const loadPosts = async () => {
    setLoading(true);

    try {
      const postsFromServer = await getAllPosts();

      setUserPosts(postsFromServer);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.log('Fetch userPosts: ', error);
    }
  };

  const loadPostsByUser = async (userId: number) => {
    setLoading(true);

    try {
      const postsFromServer = await getUserPosts(userId);

      setUserPosts(postsFromServer);
      setLoading(false);
    } catch (error) {
      setUserPosts(initialPosts);
      // eslint-disable-next-line no-console
      console.log('Error', error);
    }
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === '0') {
      loadPosts();
    } else {
      loadPostsByUser(Number(value));
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={onSelectChange}
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
          {userPosts.length > 0 && ( // if posts.length - you will see '0' at the page
            <PostsList
              posts={userPosts}
              selectedPostId={selectedPostId}
              onSelect={(postId) => selectPost(postId)}
            />
          )}
          {!isLoading && !userPosts.length && (
            <p className="posts--empty">No todos</p>
          )}
          {isLoading && (
            <Loader />
          )}
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && <PostDetails postId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
