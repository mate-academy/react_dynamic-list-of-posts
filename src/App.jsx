import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';

import * as postAPI from './api/posts';
import * as userAPI from './api/users';
import * as commentAPI from './api/comments';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);

  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    userAPI.getUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      postAPI.getPosts()
        .then(setPosts);
    } else {
      postAPI.getUserPosts(selectedUser)
        .then(setPosts);
    }
  }, [selectedUser]);

  const onOpenPost = (postId) => {
    setSelectedPostId(postId);

    Promise.all([
      postAPI.getPostDetails(postId),
      commentAPI.getComments(postId),
    ]).then(([postResult, commentResult]) => {
      setSelectedPost(postResult);
      setComments(commentResult);
    });
  };

  const onShowComments = () => {
    setShowComments(!showComments);
  };

  const onDeleteComment = async(commentId) => {
    await commentAPI.deleteComment(commentId);

    updateComments();
  };

  const onAddComment = async({ name, email, body }) => {
    const data = {
      name,
      email,
      body,
      id: Math.floor(Math.random() * 10000),
      postId: selectedPostId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await commentAPI.postComment(data);
    updateComments();
  };

  const updateComments = () => {
    commentAPI.getComments(selectedPostId)
      .then(setComments);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            value={selectedUser}
            onChange={({ target }) => setSelectedUser(+target.value)}
            className="App__user-selector"
          >
            <option value="">All users</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            onOpenPost={onOpenPost}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {!selectedPost
            ? (<p>No selected posts</p>)
            : (
              <PostDetails
                post={selectedPost}
                comments={comments}
                showComments={showComments}
                onShowComments={onShowComments}
                onDeleteComment={onDeleteComment}
                onAddComment={onAddComment}
              />
            )
          }
        </div>

      </main>
    </div>
  );
};

export default App;
