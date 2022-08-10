import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getPostDetails } from './api/posts';
import { getPostComments } from './api/comments';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [postsList, setPostsList] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('');
  const [postDetails, setPostDetails] = useState({
    id: '',
    userId: '',
    title: '',
    body: '',
    createdAt: '',
    updatedAt: '',
  });
  const [postComments, setPostComments] = useState([]);

  const downloadPosts = async (userId: string) => {
    // eslint-disable-next-line no-console
    console.log(userId);

    if (currentUser !== userId) {
      const posts = await getUserPosts(userId);

      setSelectedPostId('');
      setPostDetails({
        id: '',
        userId: '',
        title: '',
        body: '',
        createdAt: '',
        updatedAt: '',
      });
      setCurrentUser(userId);
      setPostsList(posts);
    }
  };

  const downloadPostDetails = async (postId: string) => {
    // eslint-disable-next-line no-console
    console.log(postId);

    const newPostDetails = await getPostDetails(postId);

    setPostDetails(newPostDetails);

    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    // const timerId = window.setTimeout(setPostDetails, 5000, newPostDetails);

    // window.clearTimeout(timerId);
  };

  const downLoadComments = async (id: string) => {
    if (selectedPostId === id) {
      setSelectedPostId('');
    } else {
      const comments = await getPostComments(id);

      setSelectedPostId(id);
      setPostComments(comments);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={e => downloadPosts(e.target.value)}
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

        <p>{`selectedPostId: ${selectedPostId}`}</p>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            postsList={postsList}
            selectedPostId={selectedPostId}
            downloadPostDetails={downloadPostDetails}
            downLoadComments={downLoadComments}
          />
        </div>

        <div
          className="App__content"
          style={{
            visibility: `${!selectedPostId ? 'hidden' : 'visible'}`,
          }}
        >
          {!postDetails.id ? (
            <div>
              <Loader />
            </div>
          ) : (
            <PostDetails
              postComments={postComments}
              postDetails={postDetails}
            />
          )}
        </div>

      </main>
    </div>
  );
};

export default App;
