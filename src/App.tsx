import React, { useState } from 'react';
import './App.css';
import { getElements } from './api';
import { PostList } from './Components/PostList/PostList';

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  function LoadData() {
    setIsInitialized(true);
    getElements().then(resolve => {
      const [tempPosts, tempUsers, TempComments] = resolve;

      setPosts(tempPosts);
      setUsers(tempUsers);
      setComments(TempComments);
      setIsLoaded(true);
    });
  }

  return (
    <div className="post-list">
      {posts.length !== 0 && (
        <PostList
          posts={posts}
          users={users}
          comments={comments}
        />
      )}
      {!isInitialized && !isLoaded && (
        <button type="button" onClick={LoadData}>
          Load
        </button>
      )}
      {(isInitialized && (
        <p>
          Loading...
        </p>
      ))}
    </div>
  );
};

export default App;
