import React, { useState } from 'react';
import './App.css';
import { getData } from './api';
import { Search } from './components/Search/Search';
import { Posts } from './components/Posts/Posts';
import { CompletePost } from './interfaces';

const App = () => {
  const [posts, setPosts] = useState<CompletePost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [listLoaded, setListLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<CompletePost[]>([]);

  const handlerGetData = async () => {
    setIsLoaded(true);
    setDisabled(true);

    await getData().then(data => setPosts(data));
    await getData().then(data => setFilteredPosts(data));

    setListLoaded(true);
  };

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setInputValue(value);

    const newPosts = posts.filter(post => post.title.includes(value)
    || post.body.includes(value));

    setFilteredPosts(newPosts);
  };

  return (
    <div className="main">
      <Search
        handlerGetData={handlerGetData}
        onChangeHandler={onChangeHandler}
        inputValue={inputValue}
        listLoaded={listLoaded}
        isLoaded={isLoaded}
        disabled={disabled}
      />
      <Posts posts={filteredPosts} />
    </div>
  );
};

export default App;
