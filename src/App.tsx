import React, { FC, useState } from 'react';
import './App.css';
import { getPreparedList } from './Components/preparedList/preparedList';
import { ListsState } from './Components/interfaces/interfaces';
import { PostsLists } from './Components/PostsList/PostsList';
import { SearchBar } from './Components/SearchBar/SearchBar';
import { Button } from './Components/LoadButton/LoadButton';

const App: FC = () => {
  const [postList, setPostsList] = useState<ListsState>({
    initialList: [],
    filteredList: [],
  });
  const [isLoading, setLoading] = useState<string>('Load');

  const onLoad = async () => {
    if (postList.initialList.length) {
      return;
    }

    setLoading('Loading...');
    const loadedList = await getPreparedList();

    setPostsList({
      initialList: loadedList,
      filteredList: loadedList,
    });
    setLoading('Load');
  };

  const onFilterList = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const wasFilteredList = postList.initialList
      .filter(post => post.title.includes(value) || post.body.includes(value));

    setPostsList({
      ...postList,
      filteredList: wasFilteredList,
    });
  };

  const isLoad = Boolean(postList.initialList.length);

  return (
    <>
      <h1>Dynamic list of posts</h1>
      {!isLoad ? (
        <Button
          title={isLoading}
          onLoad={onLoad}
        />
      )
        : (
          <>
            <SearchBar
              onFilterList={onFilterList}
            />
            <PostsLists
              postsList={postList.filteredList}
            />
          </>
        )}
    </>
  );
};

export default App;
