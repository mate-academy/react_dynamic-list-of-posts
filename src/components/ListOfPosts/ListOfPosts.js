import React from 'react';
import PropTypes from 'prop-types';

import './ListOfPosts.css';
import PostItem from '../PostItem/PostItem';

class ListOfPosts extends React.Component {
  state = {
    searchValue: '',
  };

  searchPost = (event) => {
    const value = event.target.value.trim();
    this.setState({ value });
  };

  filter(searchValue) {
    // eslint-disable-next-line max-len
    return this.props.posts.filter((post) => {
      const preparedValue = searchValue.replace(/ /g, '').toLowerCase();
      return post.postItem.title.replace(/ /g, '').toLowerCase().includes(preparedValue);
    });
  }

  render() {
    return (
      <div className="posts-list">

        <label htmlFor="search-post" className="search-post">
          <input
            placeholder="Search post"
            type="search"
            id="search-post"
            className="search-post__input"
            onChange={(e) => { this.searchPost(e); }}
          />
        </label>

        <div className="posts">
          {
            this.filter(this.state.searchValue).map(post => <PostItem post={post} />)
          }
        </div>

      </div>
    );
  }
}

ListOfPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListOfPosts;
