import React, { useState, useCallback } from 'react';
import './App.css';
import {
  getUsers, getPosts, getComments, Post, debounce
} from './helper/api';
import { PostList } from './Components/PostList';
import { Filter } from './Components/Filter';

const App = () => {
  const [posts, setPost] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const handleLoadClick = async () => {
    setIsLoading(true);
    try {
      const postsFromServer = await getPosts();
      const usersFromServer = await getUsers();
      const commentsFromServer = await getComments();


      const completedPost = postsFromServer.map(post => ({
        ...post,
        user: usersFromServer.find(user => user.id === post.userId),
        commentList: commentsFromServer.filter(comment => comment.postId === post.id),
      }));

      setPost(completedPost);
      setLoaded(true);
    } catch (e) {
      setErrorMessage('loading error, please try again later');
    }

    setIsLoading(false);
  };

  const setTermWithDebounce = useCallback(
    debounce(setTerm, 1000), []
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setTermWithDebounce(value);
  };


  const search = (postsSearch: Post[], termSearch: string) => {
    if (term.length === 0) {
      return postsSearch;
    }

    return postsSearch.filter(post => (
      post.body.toLowerCase().includes(termSearch.toLowerCase())
      || post.title.toLowerCase().includes(termSearch.toLowerCase())
    ));
  };

  const visiblePost = search(posts, term);

  return (
    <div className="container">
      <h1 className="text-center">Dynamic list of posts</h1>

      {!loaded ? (
        <div className="text-center">
          <button type="button" className="btn btn-primary" onClick={handleLoadClick}>
            {isLoading && 'Loading...'}
            {!isLoading && 'Load'}
          </button>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
      ) : (
        posts.length > 0 ? (
          <>
            <Filter handleSearch={handleSearch} value={value} />
            <PostList visiblePost={visiblePost} />
          </>
        )
          : (<div className="text-center">No posts yet</div>)
      )}
    </div>
  );
};

export default App;
