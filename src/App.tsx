import React, { Component } from 'react';
import './App.css';
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
    searchQuery: '',
  };

  loadPosts = () => {
    this.setState({ isLoading: true });

    preparePosts()
      .then(posts => this.setState({ posts, isLoaded: true }))
      .finally(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ hasError: true }));
  };

  setSearchQuery = (query: string) => {
    this.setState({
      searchQuery: query
        .trim()
        .toLocaleLowerCase()
        .replace(/\s/g, ' '),
    });
  };

  searchPosts = () => {
    const { posts, searchQuery } = this.state;
    const filteredPosts = posts.filter(post => {
      const content = `${post.title} ${post.body}`
        .toLocaleLowerCase()
        .replace(/\s/g, ' ');

      return content.includes(searchQuery);
    });

    return filteredPosts;
  };

  render() {
    const {
      isLoading,
      isLoaded,
      hasError,
    } = this.state;

    const searchedPosts = this.searchPosts();

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
            <progress className="progress is-primary" max="100">
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
              <Search setSearchQuery={this.setSearchQuery} />
              <PostList posts={searchedPosts} />
            </>
          )}
          {isLoaded && !searchedPosts.length && (
            <div className="notification is-warning">
              Posts not found....
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default App;
