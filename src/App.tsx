import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getPostDetails } from './api/posts';
import { getPostComments } from './api/comments';
import { Loader } from './components/Loader';

const initialPostDetails = {
  id: '',
  userId: '',
  title: '',
  body: '',
  createdAt: '',
  updatedAt: '',
};

const App: React.FC = () => {
  const [postsList, setPostsList] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('');
  const [postDetails, setPostDetails] = useState(initialPostDetails);
  const [postComments, setPostComments] = useState([]);
  const [showLoaderPostsList, setShowLoaderPostsList] = useState(false);
  const [showLoaderPostsDetails, setShowLoaderPostsDetails] = useState(false);

  const downloadPosts = async (userId: string) => {
    // eslint-disable-next-line no-console
    console.log(userId);

    setShowLoaderPostsList(true);

    try {
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
        setShowLoaderPostsList(false);
      }
    } catch (error) {
      setShowLoaderPostsList(false);
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  };

  const downloadPostDetails = async (postId: string) => {
    setShowLoaderPostsDetails(true);

    try {
      // eslint-disable-next-line no-console
      console.log(postId);

      const newPostDetails = await getPostDetails(postId);

      setPostDetails(newPostDetails);
      setShowLoaderPostsDetails(false);
    } catch (error) {
      setShowLoaderPostsDetails(false);
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
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
            defaultValue="DEFAULT"
            onChange={e => downloadPosts(e.target.value)}
          >
            <option value="DEFAULT" disabled>
              Choose...
            </option>
            <option value="All">All users</option>
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
        {currentUser && (
          <div className="App__sidebar">
            {showLoaderPostsList ? (
              <Loader />
            ) : (
              <PostsList
                postsList={postsList}
                selectedPostId={selectedPostId}
                downloadPostDetails={downloadPostDetails}
                downLoadComments={downLoadComments}
              />
            )}
          </div>
        )}

        {postDetails.id && (
          <div
            className="App__content"
            style={{
              visibility: `${!selectedPostId ? 'hidden' : 'visible'}`,
            }}
          >
            {showLoaderPostsDetails ? (
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
        )}

      </main>
    </div>
  );
};

export default App;
