import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import {
  loadUsersPosts,
  loadUserPostDetails,
  loadUserComments,
  deleteCommnt,
} from './api/api';

const App: React.FC = () => {
  const [posts, setPost] = useState<Post[]>([]);
  const [postId, setUserPost] = useState(0);
  const [detail, setDetail] = useState('');
  const [comm, setComm] = useState<Post[]>([]);
  const [hide, setHide] = useState(true);
  const [testId, setTestId] = useState(0);

  const fetchComments = async () => {
    const com = await loadUserComments(testId);

    setComm(com);
  };

  const fetchListPosts = async () => {
    const userPostsFromServer = await loadUsersPosts();

    if (postId > 0) {
      return setPost(userPostsFromServer.filter(e => e.userId === postId));
    }

    return setPost(userPostsFromServer);
  };

  const deleteComm = async (id: number) => {
    await deleteCommnt(id);
    await fetchComments();
  };

  useEffect(() => {
    fetchListPosts();
    fetchComments();
  }, [postId]);

  const handleSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserPost(+event.target.value);
  };

  const openDetail = async (postId1 = 0) => {
    setTestId(postId1);
    const det = await loadUserPostDetails(postId1);
    const comm12 = await loadUserComments(postId1);

    // eslint-disable-next-line no-console
    console.log('comm12---', comm12);

    setComm(comm12);
    setDetail(det.title);
  };

  const handleButtonHide = () => {
    setHide(!hide);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="label">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={postId}
            onChange={handleSelector}
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
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            openDetail={openDetail}
            testId={testId}
          />
        </div>

        <div className="App__content">
          {testId !== 0 && (
            <PostDetails
              fetchComments={fetchComments}
              detail={detail}
              comm={comm}
              hide={hide}
              handleButtonHide={handleButtonHide}
              deleteComm={deleteComm}
              testId={testId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
