import React, { useState, FormEvent } from 'react';
import './App.css';
import { getPosts, getUsers, getComments } from './API';
import PostList from './PostList';

const App = () => {
  const [posts, setPreparedPosts] = useState([]);
  const [isLoading, setIsLoadind] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');

  const loadPosts = async () => {
    setIsLoadind(true);

    const [postsFromServer, usersFromServer, commentsFromServer] = await Promise.all(
      [getPosts(), getUsers(), getComments()],
    );

    const preparedPosts = postsFromServer.map((post: PostProps) => ({
      ...post,
      comments: commentsFromServer.filter((comment: CommentProps) => comment.postId === post.id),
      author: usersFromServer.find((user: UserProps) => user.id === post.userId),
    }));

    setPreparedPosts(preparedPosts);
    setIsLoadind(false);
    setIsLoaded(true);
  };

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    setQuery(value);
  };

  const filteredPosts = posts
    .filter((post: PostProps) => (post.title + post.body)
      .toLowerCase()
      .includes(query.toLowerCase()));

  return (
    <>
      <h1 className="display-5">Dynamic list of posts</h1>
      <div className="buttons">
        {!isLoaded && (
          <button
            className="btn btn-primary"
            disabled={isLoading}
            type="button"
            onClick={loadPosts}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
        {isLoaded
        && <input type="text" className="form-control mrl" onChange={handleInput} />}
      </div>
      {isLoading
        && <div className="spinner-border text-primary" role="status" />}
      <div className="container">
        <PostList posts={filteredPosts} />
      </div>
    </>
  );
};

export default App;
