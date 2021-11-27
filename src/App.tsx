import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUsers, getPostDetails } from './api/api';

const App: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[] | null>(null);
  const [allPosts, setAllPosts] = useState<Post[] | null>(null);
  const [postByUserId, setpostByuserId] = useState<number>(0);
  const [postDetail, setPostDetail] = useState<Post | null>(null);

  function showPostDetail(id:number) {
    if (postDetail?.id && postDetail?.id === id) {
      setPostDetail(null);
    } else {
      getPostDetails(id)
        .then(post => setPostDetail(post));
    }
  }

  useEffect(() => {
    getPosts()
      .then(posts => {
        setAllPosts(posts);
      });

    getUsers()
      .then(user => {
        const live = user.filter(u => u.username !== null && u.username !== '');

        setAllUsers(live);
      });
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <div>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            onChange={(event) => {
              setpostByuserId(+event.target.value);
            }}
          >
            <option value="0">All users</option>
            {allUsers?.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            postByUserId={postByUserId}
            posts={allPosts}
            activePost={postDetail?.id}
            showPost={(id:number) => {
              showPostDetail(id);
            }}
          />
        </div>
        { !!postDetail && (
          <div className="App__content">
            <PostDetails
              post={postDetail}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
