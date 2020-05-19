import React, { useState, useMemo } from 'react';
import './App.scss';
import { getPosts, getComments, getUsers } from './api';
import PostList from './PostList';


const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isloading, setLoading] = useState<boolean>(false);
  const [isLoaded, setLoad] = useState<boolean>(false);
  const [query, setQuery] = useState('');

  const loadPosts = async () => {
    setLoading(true);
    const postFromServer = await getPosts();
    const usersFromServer = await getUsers();
    const commentsFromServer = await getComments();

    const prepearedPosts = postFromServer.map((post: Post) => ({
      ...post,
      user: usersFromServer.find((user: User) => user.id === post.userId),
      comments: commentsFromServer.filter((comment: Comment) => comment.postId === post.id),
    }));

    setPosts(prepearedPosts);
    setLoad(true);
    setLoading(false);
  };

  const searchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;

    setQuery(target);
  };

  const filteredposts = useMemo(() => posts.filter(post => {
    return (post.title + post.body).toLowerCase().includes(query.trim().toLowerCase());
  }), [query, posts]);


  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {!isLoaded ? (
        <button
          type="button"
          className="button"
          onClick={loadPosts}
        >
          {isloading ? 'Loading...' : 'Click to Load'}
        </button>
      ) : (
        <>
          <input
            type="text"
            className="input"
            placeholder="what you search"
            onChange={searchQuery}
          />
          <PostList posts={filteredposts} />
        </>
      )}
    </div>
  );
};

export default App;
