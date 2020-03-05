import React, { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { PostItem } from '../PostItem/PostItem';
import './PostsList.css';

interface Props {
  postList: PrepearedPost[];
}

function filterPosts(prepearedPosts: PrepearedPost[], value: string): PrepearedPost[] {
  return [...prepearedPosts].filter(post => (
    post.title.toLowerCase().includes(value.toLowerCase())
    || post.body.toLowerCase().includes(value.toLowerCase())
  ));
}

export const PostsList: FC<Props> = ({ postList }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filedQuery, setFiledQuery] = useState<string>('');

  const vissiblePosts = useMemo(
    () => filterPosts(postList, filedQuery),
    [filedQuery],
  );

  const setFiledQueryWithDebouce = useCallback(
    debounce(setFiledQuery, 1000),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setFiledQueryWithDebouce(event.target.value);
  };


  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="sorted-filed"
        placeholder="Search by title and body"
      />
      {
        vissiblePosts.map(post => (
          <PostItem postItem={post} key={post.id} />
        ))
      }
    </>
  );
};
