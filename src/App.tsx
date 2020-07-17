import React, { FC, useState } from 'react';
import { PostListInterface } from './interfaces';
import { getPrepearedPosts } from './api/api';
import { PostList } from './Components/PostList/PostList';
import { SearchBar } from './Components/SearchBar/SearchBar';
import './App.css';

const App: FC = () => {
  const [postList, setPostList] = useState<PostListInterface[]>([]);
  const [filteredList, setFilteredList] = useState<PostListInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getList = async () => {
    setIsLoading(true);
    await getPrepearedPosts().then(data => {
      setPostList(data);
      setFilteredList(data);
    });
    setIsLoading(false);
    setIsLoaded(true);
  };

  const getKeywords = (event: React.FormEvent<HTMLInputElement>) => {
    const word = event.currentTarget.value;
    const pattern = new RegExp(`${word}`, 'gi');

    const newList = postList.filter(post => pattern.test(post.title)
    || pattern.test(post.body));

    setFilteredList(newList);
  };

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {!isLoaded
        ? (
          <button
            type="button"
            onClick={getList}
            disabled={isLoading}
          >
            {isLoading ? 'loading' : 'Load'}
          </button>
        )
        : (
          <div>
            <SearchBar onChange={getKeywords} />
            <PostList postList={filteredList} />
          </div>
        )}

    </div>
  );
};

export default App;
