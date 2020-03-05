import React, {
  ChangeEvent, useState, FC, useMemo,
} from 'react';
import './App.css';
import { PostList } from './components/PostList';
import { getPostsWithUsersAndComments } from './components/getData/getData';

const App: FC = () => {
  const [posts, setPosts] = useState<PostWithUserAndComment[]>([]);
  const [originalPosts, setOriginalPosts] = useState<PostWithUserAndComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState('');

  const handleStart = async () => {
    setIsLoading(true);
    const postsFromServer = await getPostsWithUsersAndComments();

    setOriginalPosts(postsFromServer);
    setPosts(postsFromServer);
    setIsLoading(false);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setText(target.value.toLowerCase());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setText('');
  };

  useMemo(() => {
    setPosts(originalPosts
      .filter(post => post.title.toLowerCase().includes(text)
        || post.body.toLowerCase().includes(text)));
  }, [text]);

  if (isLoading) {
    return (
      <div className="title">
        <p>Loading...</p>
      </div>
    );
  }

  if (!originalPosts.length) {
    return (
      <div className="title">
        <button type="button" onClick={handleStart}>Load</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1 className="title is-1 is-spaced">Dynamic list of posts</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            className="input is-medium"
            placeholder="Find posts"
            onChange={handleInput}
            value={text}
            type="text"
          />
        </div>
      </form>
      <PostList posts={posts} />
    </div>
  );
};

export default App;
