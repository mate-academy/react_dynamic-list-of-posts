import React, { useState } from 'react';

type Props = {
  searchFilter: (searchQuery: string) => void;
  posts: Post[];
};

const PostSearch: React.FC<Props> = ({ searchFilter, posts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;

    setSearchQuery(inputValue);
    searchFilter(searchQuery);
  };

  return (
    <div className="posts__search">
      Search (results:
      {posts.length}
      )
      <input
        className="posts__search-input"
        type="text"
        value={searchQuery}
        onChange={e => handleSearchInput(e)}
        onKeyUp={e => handleSearchInput(e)}
      />
    </div>
  );
};

export default PostSearch;
