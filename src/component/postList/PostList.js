import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from '../post/Post';

class PostList extends Component {
  state = {
    search: '',
  }

  filterOfPosts = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    const filteredPosts = this.props.table
      .filter(post => post.title.includes(this.state.search)
        || post.body.includes(this.state.search));

    return (
      <>
        <input
          type="text"
          className="input"
          placeholder="SEARCH HERE"
          onChange={this.filterOfPosts}
        />
        {filteredPosts.map(item => <Post key={item.id} table={item} />)}
      </>
    );
  }
}

PostList.propTypes = {
  table: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
