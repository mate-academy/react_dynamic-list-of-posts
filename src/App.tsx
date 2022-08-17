import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';

import { Post } from './types/Post';
import { User } from './types/User';
import { Comment } from './types/Comment';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getAllUsers } from './api/users';
import { getAllPosts } from './api/posts';
import { getUserPosts } from './api/userPosts';
import { getPostComments } from './api/comments';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[] | null>(null);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    const loadAllUsers = async () => {
      const result = await getAllUsers();

      setAllUsers(result);
    };

    loadAllUsers();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoadingPost(true);

      const result = selectedUserId === 0
        ? await getAllPosts()
        : await getUserPosts(selectedUserId);

      setUserPosts(result);
      setIsLoadingPost(false);
    };

    loadPosts();
  }, [selectedUserId]);

  const handleSelectingPost = async (post: Post) => {
    setIsLoadingDetails(true);
    setSelectedPost(post);

    const result = await getPostComments(post.id);

    setPostComments(result);
    setIsLoadingDetails(false);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={(e) => {
              setSelectedUserId(+e.target.value);
              setSelectedPost(null);
            }}
          >
            <option value="0">All users</option>
            {allUsers?.map(user => (
              <option value={user.id} key={user.id}>
                {user.name ? user.name : `Incognito user: id${user.id}`}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {userPosts && (
            <PostsList
              loading={isLoadingPost}
              posts={userPosts}
              selectedPost={selectedPost}
              setSelectedPost={setSelectedPost}
              onSelectingPost={handleSelectingPost}
            />
          )}
        </div>

        {selectedPost && (
          <div className="App__content">
            {isLoadingDetails
              ? (<Loader />)
              : (
                <PostDetails
                  selectedPost={selectedPost}
                  postComments={postComments}
                  setPostComments={setPostComments}
                />
              )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
