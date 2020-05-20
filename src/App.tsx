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
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterValue, setFilterValue] = useState('');
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
      setIsLoaded(true);
    } catch (e) {
      setErrorMessage('loading error, please try again later');
    }

    setIsLoading(false);
  };

  const setTermWithDebounce = useCallback(
    debounce(setFilterValue, 1000), []
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setTermWithDebounce(e.target.value);
  };


  const searchBlog = (postsSearch: Post[], termSearch: string) => {
    if (filterValue.length === 0) {
      return postsSearch;
    }

    return postsSearch.filter(post => {
      const bodyNormalize = post.body.toLowerCase();
      const titleNormalize = post.title.toLowerCase();
      return (bodyNormalize + titleNormalize).includes(termSearch.toLowerCase())
    })
  };

  const visiblePost = searchBlog(posts, filterValue);

  return (
    <div className="container">
      <h1 className="text-center">Dynamic list of posts</h1>

      {!isLoaded ? (
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
