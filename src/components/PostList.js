import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

class PostList extends React.Component {
  state = {
    inputValue: '',
  }

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  render() {
    const { posts } = this.props;
    const { inputValue } = this.state;
    let filteredPosts = null;

    !inputValue
      ? filteredPosts = [...posts]
      : filteredPosts = [...posts].filter(
        post => post.title.includes(inputValue)
          || post.body.includes(inputValue)
      );

    return (
      <>
        <h1>POSTS</h1>
        <label htmlFor="filter-posts">Filter the posts: </label>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={inputValue}
          id="filter-posts"
        />
        <ul>
          {filteredPosts.map(post => (
            <Post post={post} key={post.id} />
          ))}
        </ul>
      </>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
