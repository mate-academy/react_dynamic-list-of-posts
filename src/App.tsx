import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPostDetails, getPosts } from './api/posts';

const App: React.FC = () => {
  const [
    listOfPosts,
    setListOfPosts,
  ] = useState<Post[]>([]);

  const [
    visibleListOfPosts,
    setVisibleListOfPosts,
  ] = useState([...listOfPosts]);

  const [
    selectedPostId,
    setSelectedPostId,
  ] = useState(-1);

  const [
    selectedPostContent,
    setSelectedPostContent,
  ] = useState('');

  const userSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (+event.target.value === 0) {
      setVisibleListOfPosts([...listOfPosts]);

      return;
    }

    setVisibleListOfPosts(listOfPosts
      .filter(post => {
        if (post.userId) {
          return post.userId === +event.target.value;
        }

        return false;
      }));
  };

  const handleButtonOpenClick = async (postId: number) => {
    if (postId === selectedPostId) {
      setSelectedPostId(-1);
      setSelectedPostContent('');

      return;
    }

    setSelectedPostId(postId);

    const detailsOfSelectedPost = await getPostDetails(postId);

    setSelectedPostContent(detailsOfSelectedPost.body);
  };

  useEffect(() => {
    getPosts().then(result => {
      setListOfPosts(result);
      setVisibleListOfPosts(result);
    });
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={userSelect}
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
            postsList={visibleListOfPosts}
            selectedId={selectedPostId}
            handleOpenClick={handleButtonOpenClick}
          />
        </div>

        <div className="App__content">
          {
            selectedPostId !== 0
            && (
              <PostDetails
                postId={selectedPostId}
                content={selectedPostContent}
                // comments={commentsContent}
                // removeButtonClick={removeComment}
              />
            )
          }
        </div>
      </main>
    </div>
  );
};

export default App;
