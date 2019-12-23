import React, { useState } from 'react';
import getPosts from './api/postsApi';
import getUsers from './api/usersApi';
import getComments from './api/CommentsApi';
import PostList from './Components/PostList/PostList';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  const loadData = async() => {
    setIsStarted(true);
    const [
      postsFromServer,
      usersFromServer,
      commentsFromServer,
    ] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ]);

    setPosts(postsFromServer.map(post => (
      {
        ...post,
        user: usersFromServer.find(singleUser => singleUser.id === post.userId),
        comments: commentsFromServer
          .filter(comment => comment.postId === post.id),
      })));
  };

  const filterData = (event) => {
    setPosts([...posts]
      .filter(post => post.body.includes(event.target.value)));
  };

  return (
    isStarted
      ? (
        <section>

          <div className="ui input">
            <input
              type="text"
              placeholder="Search..."
              onChange={filterData}
            />
          </div>

          <PostList list={posts} />
        </section>

      ) : (
        <button
          onClick={loadData}
          type="button"
        >
          {isStarted ? 'Loading...' : 'Load'}
        </button>
      )
  );
};

export default App;
