import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ posts }) => {
  const [searchingItem, setSearchingItem] = useState('');

  const handleSearchingInputChange = ({ target: { value } }) => {
    setSearchingItem(value);
  };

  const getSearchedPosts = (ArrOfPosts, searchingValue) => (
    ArrOfPosts.filter(post => (
      post.title.toLowerCase().includes(searchingValue.toLowerCase())
      || post.body.toLowerCase().includes(searchingValue.toLowerCase())
    )));

  const visiblePosts = searchingItem
    ? getSearchedPosts(posts, searchingItem)
    : posts;

  return (
    <>
      <input
        onChange={handleSearchingInputChange}
        className="search"
        type="text"
        placeholder="Search"
      />
      {(visiblePosts.length < 1)
        ? (<div className="result">No results...</div>)
        : (visiblePosts
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
