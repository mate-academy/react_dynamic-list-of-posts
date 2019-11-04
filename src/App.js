import React from 'react';
import './App.css';

import getPostsWithDependencies from './api';
import PostList from './components/PostList';

class App extends React.Component {
  state = {
    posts: [],
    isLoading: false,
    hasError: false,
  }

  loadPosts = () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    getPostsWithDependencies()
      .then((posts) => {
        this.setState({ posts });
      })
      .catch(() => {
        this.setState({ hasError: true });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { posts, isLoading, hasError } = this.state;

    if (isLoading) {
      return <button type="button">Loading...</button>;
    }

    if (hasError) {
      return (
        <>
          <p>Error occurred</p>
          <button type="button" onClick={this.loadPosts}>
            Try again
          </button>
        </>
      );
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
