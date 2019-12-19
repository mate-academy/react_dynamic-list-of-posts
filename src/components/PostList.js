import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const PostList = ({ list, highlightedSearchResult }) => (
  <div className="posts-container">
    {list.map(
      item => (
        <Post
          highlightedText={highlightedSearchResult}
          key={item.id}
          {...item}
        />
      )
    )}
  </div>
);

PostList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  highlightedSearchResult: PropTypes.string.isRequired,
};

export default PostList;
