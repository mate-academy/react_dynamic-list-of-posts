import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { requestStudents } from './api/api';
import { requestPosts, getPostDetails } from './api/posts';
import { Comment, Post, User } from './types/types';
import { getPostComments } from './api/comments';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('0');
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setComments] = useState<Comment[]>([]);

  const postsFilterBySelectedUser = () => {
    if (selectedUser === '0') {
      return posts;
    }

    return posts.filter((post: Post) => post.userId.toString() === selectedUser);
  };

  const updateData = async () => {
    const usersFromServer = await requestStudents();
    const postsFromServer = await requestPosts();

    setUsers(usersFromServer);
    setPosts(postsFromServer);
  };

  useEffect(() => {
    updateData();
  }, []);

  const updateDetails = async () => {
    const postDetailsFromServer = await getPostDetails(selectedPostId);
    const postCommentsFromServer = await getPostComments(selectedPostId);

    setPostDetails(postDetailsFromServer);
    setComments(postCommentsFromServer);
  };

  useEffect(() => {
    updateDetails();
  }, [selectedPostId]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUser(value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            id="select"
            className="App__user-selector"
            value={selectedUser}
            onChange={handleChange}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={postsFilterBySelectedUser()}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0
            ? (
              <PostDetails
                postDetails={postDetails}
                comments={postComments}
                selectedPostId={selectedPostId}
                updateDetails={updateDetails}
              />
            )
            : 'Open post to get info'}
        </div>
      </main>
    </div>
  );
};

export default App;
