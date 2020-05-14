import React, {
  useState, FormEvent, useMemo, useCallback,
} from 'react';
import './App.css';
import debounce from 'lodash.debounce';
import { getPosts, getUsers, getComments } from './API';
import PostList from './PostList';

const App = () => {
  const [posts, setPreparedPosts] = useState([]);
  const [isLoading, setIsLoadind] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('.');

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
    setFilterQuery('');
  };

  const setFilterQueryWithDebounce = useCallback(debounce(setFilterQuery, 1000), []);

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    setQuery(value);
    setFilterQueryWithDebounce(value);
  };

  const filteredPosts = useMemo(
    () => posts
      .filter((post: PostProps) => (post.title + post.body)
        .toLowerCase()
        .includes(query.toLowerCase())), [filterQuery],
  );

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
        && (
          <input
            type="text"
            value={query}
            className="form-control mrl"
            onChange={handleInput}
          />
        )}
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
