import React from 'react';
import PropTypes from 'prop-types';

import './ListOfPosts.css';
import PostItem from '../PostItem/PostItem';

class ListOfPosts extends React.Component {
  state = {
    searchValue: '',
  };

  searchPost = (event) => {
    const searchValue = event.target.value.trim();
    this.setState({ searchValue });
  };

  filterPosts(searchValue) {
    const preparedValue = searchValue.replace(/\s+/g, ' ').toLowerCase();
    return this.props.posts.filter((post) => {
      return post.postItem.title
        .toLowerCase()
        .includes(preparedValue);
    });
  }

  render() {
    const filteredPosts = this.filterPosts(this.state.searchValue);
    return (
      <div className="posts-list">

        <label htmlFor="search-post" className="search-post">
          <input
            placeholder="Search post"
            type="search"
            id="search-post"
            className="search-post__input"
            onChange={this.searchPost}
          />
        </label>

        <div className="posts">
          {
            filteredPosts.map(post => (
              <PostItem post={post} key={post.id} />
            ))
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
