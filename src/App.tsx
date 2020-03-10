import React, {
  FC, useState, ChangeEvent, useMemo,
} from 'react';
import { PostList } from './components/PostList/PostList';
import './App.css';
import { getPosts, getUsers, getComments } from './api/api';

const App: FC = () => {
  const [posts, setPosts] = useState<FullPostType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const showPosts = async () => {
    setLoading(true);

    const [loadedPosts, loadedUsers, loadedComments] = await Promise
      .all([getPosts(), getUsers(), getComments()]);

    const preparedPosts = loadedPosts.map((post) => ({
      ...post,
      user: loadedUsers
        .find((person) => person.id === post.userId) as User,
      comment: loadedComments
        .filter((comment) => post.id === comment.postId) as CommentType[],
    }));

    setPosts(preparedPosts);
    setLoading(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setSearchValue(target.value);
  };

  const filteredPosts = useMemo(() => posts.filter(post => post.title.toLowerCase()
    .includes(searchValue.trim().toLowerCase())
        || post.body
          .toLowerCase()
          .includes(searchValue.trim().toLowerCase())),
  [searchValue, posts]);

  return (
    <>
      {!posts.length
        ? (
          <button
            className="start-button"
            type="button"
            onClick={showPosts}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Start load posts'}
          </button>
        )
        : (
          <div className="app">
            <h1 className="main-title">Dynamic list of posts</h1>
            <input
              className="input"
              placeholder="Search the post"
              value={searchValue}
              onChange={handleChange}
              type="text"
            />
            <PostList postlists={filteredPosts} />
          </div>
        )}
    </>
  );
};

export default App;
