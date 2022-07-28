import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/posts';
import { Post } from './types';

const App: React.FC = () => {
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post>();

  useEffect(() => {
    const fetchPosts = async () => {
      setPostsList(await getAllPosts());
      setVisiblePosts(await getAllPosts());
    };

    try {
      fetchPosts();
    } catch (error) {
      throw new Error();
    }
  }, []);

  useEffect(() => {
    setSelectedPost(visiblePosts
      .find(post => post.id === selectedPostId));
  }, [selectedPostId]);

  const onPostSelect = (postId: number) => {
    if (postId !== selectedPostId) {
      setSelectedPostId(postId);
    } else {
      setSelectedPostId(0);
    }
  };

  const fetchUser = async (id: number) => {
    if (id === 0) {
      setVisiblePosts(postsList);

      return;
    }

    setVisiblePosts(await getUserPosts(id));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={({ target }) => fetchUser(+target.value)}
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
            postsList={visiblePosts}
            onPostSelect={onPostSelect}
            selectedPost={selectedPost}
          />
        </div>
        {selectedPost && (
          <div className="App__content">
            <PostDetails post={selectedPost || null} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
