import React, {
  useState,
  FC,
  ChangeEvent,
  useMemo,
} from 'react';
import './App.css';
import { getPosts, getUsers, getComments } from './api';
import { PostsList } from './components/PostsList/PostsList';

const App: FC = () => {
  const [posts, setPosts] = useState<PostExtended[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setValue] = useState('');

  const handleLoad = async () => {
    setLoading(true);
    const [postsLoaded, usersLoaded, commentsLoaded] = await Promise
      .all([getPosts(), getUsers(), getComments()]);

    const postsWithUserComments = postsLoaded.map(post => ({
      ...post,
      user: (usersLoaded.find(user => user.id === post.userId)) as User,
      comments: commentsLoaded.filter(comment => comment.postId === post.id),
    }));

    setPosts(postsWithUserComments);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    setValue(value);
  };

  const searchedPosts = useMemo(() => posts
    .filter(post => post.title
      .toLowerCase()
      .includes(searchValue.toLowerCase()) || post.body
      .toLowerCase()
      .includes(searchValue.toLowerCase())),
  [searchValue, posts]);

  return (
    <>
      {!posts.length
        ? (
          <>
            <button
              type="button"
              className="btn"
              onClick={handleLoad}
            >
              Load
            </button>
            {isLoading && <p className="text">Loading...</p>}
          </>
        ) : (
          <>
            <input
              type="text"
              className="input"
              value={searchValue}
              placeholder="Enter some text"
              onChange={handleSearch}
            />
            <PostsList posts={searchedPosts} />
          </>
        )}
    </>
  );
};

export default App;
