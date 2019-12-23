import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import Post from './Post';

const PostList = ({ posts }) => {
  const [searchPosts, setSearchPosts] = useState(posts);
  const [searchingItem, setSearchingItem] = useState('');

  const handleInput = ({ target }) => {
    setSearchingItem(target.value.toLowerCase());
    getSearchedPosts(target.value.toLowerCase());
  };

  const getSearchedPosts = debounce(inputValue => setSearchPosts(
    posts.filter(post => (
      post.title.toLowerCase().includes(inputValue)
      || post.body.toLowerCase().includes(inputValue)
    ))
  ), 1000);

  return (
    <>
      <input
        onChange={handleInput}
        value={searchingItem}
        className="search"
        type="text"
        placeholder="Search"
      />
      {(searchPosts.length < 1)
        ? (<div className="result">No results...</div>)
        : (searchPosts
          .map(currentPost => (
            <Post
              post={currentPost}
              key={currentPost.id}
            />
          )))}
    </>
  );
};

PostList.propTypes = {
  posts: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default PostList;
