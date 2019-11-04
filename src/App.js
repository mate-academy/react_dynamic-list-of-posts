import React from 'react';
import './App.css';

import getPostsWithDependencies from './api';
import PostList from './components/PostList';

class App extends React.Component {
  state = {
    posts: [],
    isLoading: false,
  }

  loadPosts = () => {
    this.setState({
      isLoading: true,
    });

    getPostsWithDependencies()
      .then((posts) => {
        this.setState({ posts, isLoading: false });
      });
  }

  render() {
    const { posts, isLoading } = this.state;

    if (isLoading) {
      return <button type="button">Loading...</button>;
    }

    if (posts.length === 0) {
      return (
        <button type="button" onClick={this.loadPosts}>
          Load
        </button>
      );
    }

    return <PostList posts={posts} />;
  }
}

export default App;
