import React from 'react';
import PropTypes from 'prop-types';
import Post from '../post/Post';

class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  searchByTitleAndBody = (event) => {
    this.setState({
      search: event.target.value,
    });
  }

  render() {
    const filteredPosts = this.props.posts.filter(post => (
      post.title.includes(this.state.search)
      || post.body.includes(this.state.search)
    ));

    const searchInput = (
      <div className="ui icon input">
        <input
          type="text"
          className="input"
          placeholder="Search"
          onChange={this.searchByTitleAndBody}
        />
        <i aria-hidden="true" className="search icon" />
      </div>
    );

    if (!filteredPosts.length) {
      return (
        <>
          {searchInput}
          <p className="searchError">No match founded</p>
        </>
      );
    }

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
