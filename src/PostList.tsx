import React, { useState, useMemo } from 'react';
import { Post } from './Post';

type Props = {
  posts: PreparedPost[];
};

export const PostList: React.FC<Props> = ({ posts }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const visiblePosts = useMemo(() => {
    return posts.filter(post => (
      (post.title+post.body).toLowerCase().includes(filterValue.toLowerCase())
      ));
  }, [posts, filterValue]);

  const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    setFilterValue(value);
  };

  return (
    <>
      <input
        className="post__input"
        placeholder="Enter words for searching"
        type="text"
        value={searchValue}
        onChange={hangleChange}
      />
      <ul className="post__list">
        {visiblePosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};
