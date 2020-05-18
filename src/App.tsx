import React, { useState } from 'react';
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

  const loadPosts = async () => {
    setIsLoading(true);

    const [usersFromServer, commentsFromServer, postsFromServer] = await Promise.all(
      [getUsers(), getComments(), getPosts()],
    );

    const preparedPosts = postsFromServer.map(post => ({
      ...post,
      author: usersFromServer.find(user => user.id === post.userId),
      comments: commentsFromServer.filter(comment => comment.postId === post.id),
    }));

    setPosts(preparedPosts);
    setIsLoading(false);
    setIsLoaded(true);
  };

  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setPostSearch(value);
  };

  const filtredPosts = getFiltredPosts(posts, postSearch);

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
    </div>
  );
};

export default App;
