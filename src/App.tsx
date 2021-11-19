import React, { useState, useEffect } from 'react';
import { getAllPosts, getUserPosts, getPostDetails } from './api/posts';
// import { getPostComments } from './api/comments';
import { BASE_URL } from './api/api';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSeledtedPostId] = useState<number>(0);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function getPosts() {
      if (userId === 0) {
        const postsFromServer = await getAllPosts(BASE_URL);

        setPosts(postsFromServer);
      } else {
        const userPosts = await getUserPosts(userId);

        setPosts(userPosts);
      }
    }

    getPosts();
  }, [userId, selectedPostId]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(Number(value));
  };

  const handlePostSelect = async (value: number) => {
    const selectedPost = await getPostDetails(value);

    setSeledtedPostId(value);

    setPost(selectedPost);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="userName">
          Select a user: &nbsp;

          <select
            name="userName"
            className="App__user-selector"
            onChange={handleSelectChange}
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
            selectedPostId={selectedPostId}
            posts={posts}
            selectPost={handlePostSelect}
          />
        </div>

        <div className="App__content">
          {post
            ? (
              <PostDetails
                selectedPostId={selectedPostId}
                post={post}
              />
            )
            : <h1>Select a post</h1> }
        </div>
      </main>
    </div>
  );
};

export default App;
