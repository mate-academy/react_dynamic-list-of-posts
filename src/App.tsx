import React, { FC, useState, ChangeEvent } from 'react';
import './App.css';
import { PostList } from './components/PostList';
import { getPosts, getUsers, getComments } from './api';

const App: FC = () => {
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const handleLoad = async () => {
    setLoading(true);
    const [postList, users, comments] = await Promise
      .all([getPosts(), getUsers(), getComments()]);

    const preparedPosts = postList.map(post => ({
      ...post,
      user: (users.find(user => user.id === post.userId)) as User,
      comments: comments.filter(comment => comment.postId === post.id) as Comment[],
    }));

    setPosts(preparedPosts);
    setLoaded(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setSearchValue(target.value);
  };

  const filteredPosts = (searchValue === '')
    ? posts
    : posts.filter(post => post.title
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase())
      || post.body
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase()));

  return (
    <>
      {!isLoaded ? (
        <div className="load">
          <button type="button" onClick={handleLoad}>Load</button>
          {isLoading && <p className="text">Loading...</p>}
        </div>
      ) : (
        <div className="app">
          <input
            type="text"
            className="search"
            placeholder="Search the post"
            value={searchValue}
            onChange={handleChange}
          />
          <PostList postList={filteredPosts} />
        </div>
      )}
    </>
  );
};

export default App;
