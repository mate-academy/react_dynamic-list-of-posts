/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  getPosts,
  getUserPosts,
  getPostDetails,
  getPostComments,
} from './api/posts';
import { getUsers } from './api/users';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [postDetails, setgetPostDetails] = useState<Post | null>(null);
  const [postsComments, setPostsComments] = useState<CommentInfo[]>([]);

  useEffect(() => {
    if (selectedUserId === 0) {
      getPosts()
        .then(response => {
          setPosts(response);
        });
    } else {
      getUserPosts(selectedUserId)
        .then((postFromServer) => setPosts(postFromServer));
    }

    setSelectedPostId(0);
  }, [selectedUserId]);

  useEffect(() => {
    getUsers()
      .then(response => setUsers(response));
  }, []);

  useEffect(() => {
    if (selectedPostId !== 0) {
      getPostDetails(selectedPostId)
        .then(response => setgetPostDetails(response));
    } else {
      setgetPostDetails(null);
    }

    getPostComments(selectedPostId)
      .then(response => setPostsComments(response));

    // console.log(postDetails); // NEED TO DELETE
  }, [selectedPostId]);

  const onUserChoice = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="temp-id">
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            id="temp-id"
            onChange={onUserChoice}
          >
            <option value="0">All users</option>
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
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">

          {postDetails && (
            <PostDetails
              postDetails={postDetails}
              postsComments={postsComments}
              setPostsComments={setPostsComments}
            />
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
