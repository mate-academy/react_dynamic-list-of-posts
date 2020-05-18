import React, { useState, useEffect } from 'react';
import { Post } from './Post';
import { SearchForm } from './SearchForm';
import useDebounce from './UseDebounce';

type PostListProps = {
  posts: PreparedPost[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suitablePosts, setSuitablePosts] = useState<PreparedPost[]>(posts);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  };

  const searchMatchedPosts = (value: string) => {
    const regexp = new RegExp(value, 'i');
    const matchedPosts = posts.filter(post => (regexp.test(post.title) || regexp.test(post.body)));

    return matchedPosts;
  };

  const debouncedInputValue = useDebounce(inputValue, 1000);

  useEffect(
    () => {
      if (debouncedInputValue) {
        const result = searchMatchedPosts(debouncedInputValue);

        setSuitablePosts(result);
      } else {
        setSuitablePosts(posts);
      }
    },
    [debouncedInputValue.length],
  );


  return (
    <>
      <div className="search_block">
        <SearchForm
          handleChangeInput={handleChangeInput}
          inputValue={inputValue}
        />
        <div className="posts_count">
          {suitablePosts.length}
          {' '}
          post(s) are found
        </div>
      </div>
      <ul>
        {suitablePosts.map(post => (
          <Post
            post={post}
            key={post.id}
          />
        ))}
      </ul>
    </>
  );
};

export default PostList;
