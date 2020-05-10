import React, { Component } from 'react';
import { preparePosts } from './api';
import { StateApp } from './components/Interface';
import { Button } from './components/Button';
import { PostList } from './components/PostList';
import { Search } from './components/Search';

class App extends Component {
  state: StateApp = {
    posts: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
  };

  loadPosts = () => {
    this.setState({ isLoading: true });

    preparePosts()
      .then(posts => this.setState({ posts, isLoaded: true }))
      .finally(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ hasError: true }));
  };

  render() {
    const {
      posts,
      isLoading,
      isLoaded,
      hasError,
    } = this.state;

    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-1">Dynamic List of Posts</h1>
          {!isLoading && !isLoaded && (
            <Button
              text="Load Posts"
              className="button"
              handleClick={this.loadPosts}
            />
          )}
          {isLoading && (
            <progress className="progress is-primary is-info" max="100">
              Loading...
            </progress>
          )}
          {hasError && (
            <>
              <p>Something went wrong...</p>
              <Button
                text="Try Again"
                className="button"
                handleClick={this.loadPosts}
              />
            </>
          )}
          {isLoaded && (
            <>
              <Search />
              <PostList posts={posts} />
            </>
          )}
        </div>
      </section>
    );
  }
}

export default App;
