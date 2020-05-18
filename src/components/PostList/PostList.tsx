import React, { useState, useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { Post } from '../Post/Post';
import './PostList.css';

type Props = {
  posts: Post[];
};

export const PostList: React.FC<Props> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const visiblePosts = useMemo(() => {
    const pattern = new RegExp(filterQuery, 'i');

    return posts.filter(({ body, title }) => pattern.test(body + title));
  }, [posts, filterQuery]);

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilterQuery, 1000),
    [],
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setFilterQueryWithDebounce(event.target.value);
  };

  return (
    <>
      <label htmlFor="search">
        Search for posts
        <input
          id="search"
          type="text"
          className="validate"
          value={searchQuery}
          onChange={handleChange}
        />
      </label>
      <div>
        <div>
          {visiblePosts.map(currentPost => (
            <Post {...currentPost} key={currentPost.id} />
          ))}
        </div>
      </div>
    </>
  );
};
