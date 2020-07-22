import React, {
  FC, useState, ChangeEvent, useMemo,
} from 'react';
import { PostList } from './components/PostList';
import './App.css';
import { loadPosts, loadUsers, loadComments } from './api/api';

const App: FC = () => {
  const [posts, setPosts] = useState<ListofPost[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearch] = useState('');

  const showPosts = async () => {
    setLoading(true);

    const [loadedPosts, loadedUsers, loadedComments] = await Promise
      .all([loadPosts(), loadUsers(), loadComments()]);

    const preparedPosts = loadedPosts.map((post) => ({
      ...post,
      user: loadedUsers.find((person) => person.id === post.userId) as User,
      comment: loadedComments.filter((comment) => post.id === comment.postId) as Comment[],
    }));

    setPosts(preparedPosts);
    setLoading(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setSearch(target.value);
  };

  const filteredPosts = useMemo(() => posts.filter(post => post.title.includes(searchValue.trim())
    || post.body.includes(searchValue.trim())),
  [searchValue, posts]);

  return (
    !posts.length
      ? (
        <button
          className="btn btn-primary button"
          type="button"
          onClick={showPosts}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Start load posts'}
        </button>
      )
      : (
        <div className="container">
          <h1>Dynamic list of posts</h1>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchValue}
            onChange={handleChange}
          />
          <PostList listOfPost={filteredPosts} />
        </div>
      )
  );
};

export default App;
