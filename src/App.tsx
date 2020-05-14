import React, { useState } from 'react';
import './App.css';
import { getElements } from './api';
import { PostList } from './Components/PostList/PostList';

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);

  function LoadData() {
    getElements().then(resolve => {
      const [tempPosts, tempUsers, TempComments] = resolve;

      setPosts(tempPosts);
      setUsers(tempUsers);
      setComments(TempComments);
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
      <button type="button" onClick={LoadData}>
        Load
      </button>
    </div>
  );
};

export default App;
