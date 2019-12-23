import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ posts }) => {
  const [searchingItem, setSearchingItem] = useState('');

  const handleSearchingInputChange = ({ target: { value } }) => {
    setSearchingItem(value);
  };

  const getSearchedPosts = (listOfPosts, searchingValue) => (
    listOfPosts.filter(post => (
      post.title.toLowerCase().includes(searchingValue.toLowerCase())
      || post.body.toLowerCase().includes(searchingValue.toLowerCase())
    )));

  const visiblePosts = searchingItem
    ? getSearchedPosts(posts, searchingItem)
    : [...posts];

  return (
    <div>
      <input
        onChange={handleSearchingInputChange}
        className="posts__search"
        type="text"
        placeholder="Search"
      />
      {visiblePosts
        .map(currentPost => <Post post={currentPost} key={currentPost.id} />)}
    </div>
  );
};

PostList.propTypes
  = { posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    postComments: PropTypes.array.isRequired,
  })).isRequired };

export default PostList;
