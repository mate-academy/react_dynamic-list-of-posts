import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPostDetails, getUserPosts, getUsers } from './api/posts';
import { addPostComent, getPostComments, removeComments } from './api/comments';
import { Post } from './types';

interface User {
  name: string;
  id: number;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState(0);
  const [postId, setPostId] = useState(0);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState([]);

  const changePostId = (id: number) => {
    setPostId(id);
  };

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    getPostComments(postId).then(result => {
      setPostComments(result);
    });

    getPostDetails(postId).then(result => {
      setPostDetails(result);
    }).catch(() => {
      setPostDetails(null);
    });

    getUserPosts(selectUser).then(setPosts);
  }, [selectUser, postId]);

  const handleDeleteComment = async (commentId: number) => {
    await removeComments(commentId);

    const commentsFromServer = await getPostComments(postId);

    setPostComments(commentsFromServer);
  };

  const handleAddComment = async (
    name: string,
    email: string,
    body: string,
  ) => {
    await addPostComent(postId, name, email, body);

    const commentsFromServer = await getPostComments(postId);

    setPostComments(commentsFromServer);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              setSelectUser(+event.target.value);
            }}
          >
            <option value="0">All users</option>
            {users.map((user: User) => (
              <option
                key={user.id}
                value={user.id}
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
            postId={postId}
            changePostId={changePostId}
          />
        </div>

        <div className="App__content">
          {postId === 0
            ? 'Not select Post'
            : (
              <PostDetails
                postComments={postComments}
                postDetails={postDetails}
                handleDeleteComment={handleDeleteComment}
                handleAddComment={handleAddComment}
              />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
