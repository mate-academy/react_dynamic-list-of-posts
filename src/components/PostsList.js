import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    const filteredPosts = this.props.posts.filter(post => (
      post.title.includes(this.state.search)
      || post.body.includes(this.state.search)
    ));

    const searchInput = (
      <div className="search__container">
        <input
          type="text"
          className="search__input"
          placeholder="Search"
          onChange={this.handleSearch}
        />
      </div>
    );

    return (
      <>
        {searchInput}
        {filteredPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
