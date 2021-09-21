import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';
import { getUserPosts, getPostDetails, getPosts } from './api/posts';

const initialPost = {
  id: 0,
  createdAt: '',
  updatedAt: '',
  userId: 0,
  title: '',
  body: '',
};

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [userSelect, setUserSelect] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null);
  const [postDetails, setPostDetails] = useState(initialPost);

  const requestGetPosts = () => {
    getPosts()
      .then(receivedFromServerPosts => {
        setPosts(receivedFromServerPosts);
      });
  };

  const requestGetUserPosts = (url: string) => {
    getUserPosts(url)
      .then(newPosts => {
        setPosts(newPosts);
      });
  };

  const requestGetPostDetails = (url: string) => {
    getPostDetails(url)
      .then(newPostsDetails => {
        setPostDetails(newPostsDetails);
      });
  };

  const handleSetUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    setUserSelect(event.target.value);
  };

  const handleSetSelectedPostId = (
    event: React.ChangeEvent<HTMLSelectElement>,
    postId = null,
  ) => {
    event.preventDefault();

    setSelectedPostId(postId);
  };

  useEffect(() => {
    if (userSelect === '0') {
      requestGetPosts();
    } else {
      requestGetUserPosts(userSelect);
    }
  }, [userSelect]);

  useEffect(() => {
    if (selectedPostId) {
      requestGetPostDetails(`${selectedPostId}`);
    } else {
      setPostDetails(initialPost);
    }
  }, [selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          userSelect={userSelect}
          handleSetUserSelect={handleSetUserSelect}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            handleSetSelectedPostId={handleSetSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? <PostDetails postDetails={postDetails} />
            : 'Post not selected'}
        </div>
      </main>
    </div>
  );
};

export default App;
