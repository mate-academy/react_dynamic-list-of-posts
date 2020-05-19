import React, { useState, useMemo } from 'react';
import './App.css';
import { getUsers, getPosts, getComments } from './helpers/api';
import { PostsList } from './components/PostsList/PostList';
import { PostSearch } from './components/PostSearch/PostSearch';


const getFiltredPosts = (posts: Post[], query: string) => {
  const pattern = query.toLocaleLowerCase();

  return posts.filter(post => (post.title + post.body)
    .toLowerCase()
    .includes(pattern));
};

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postSearch, setPostSearch] = useState<string>('');
  const [error, setError] = useState<string>('');

  const loadPosts = async () => {
    setIsLoading(true);

    let usersFromServer: User[];
    let commentsFromServer: Comment[];
    let postsFromServer: Post[];
    let preparedPosts: Post[];

    try {
      [usersFromServer, commentsFromServer, postsFromServer] = await Promise.all(
        [getUsers(), getComments(), getPosts()],
      );

      preparedPosts = postsFromServer.map(post => ({
        ...post,
        author: usersFromServer.find(user => user.id === post.userId),
        comments: commentsFromServer.filter(comment => comment.postId === post.id),
      }));

      setPosts(preparedPosts);
    } catch (e) {
      setError(e);
    }

    setIsLoading(false);
    setIsLoaded(true);
  };

  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setPostSearch(value);
  };

  const filtredPosts = useMemo(() => getFiltredPosts(posts, postSearch), [posts, postSearch]);

  return (
    <div className="container">
      {isLoaded
        ? (
          <>
            <PostSearch
              handleSearchInput={handleSearchInput}
            />
            <PostsList
              posts={filtredPosts}
            />
          </>
        )
        : (
          <button
            className="btn btn-primary btn-block"
            type="button"
            disabled={isLoading}
            onClick={loadPosts}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
        <p>{error}</p>
    </div>
  );
};

export default App;
