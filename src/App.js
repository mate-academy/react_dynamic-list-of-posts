import React, { Component } from 'react';

import './App.css';
import PostList from './components/PostList/PostList';

const BASE_URL = `https://jsonplaceholder.typicode.com`;

export default class App extends Component {
  state = {
    isLoaded: false,
    isLoading: false,
    posts: [],
    users: [],
    comments: [],
    errorMessage: null,
  };

  async onLoadClick() {
    this.setState({ isLoading: true });

    try {
      const [fetchPosts, fetchUsers, fecthComments] = await Promise.all([
        fetch(`${BASE_URL}/posts`),
        fetch(`${BASE_URL}/users`),
        fetch(`${BASE_URL}/comments`),
      ]);

      const posts = await fetchPosts.json();
      const users = await fetchUsers.json();
      const comments = await fecthComments.json();

      this.setState({
        posts, users, comments, isLoaded: true,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }
  }

  showLoaderButton = () => (this.state.isLoading
    ? (
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </button>
    )
    : (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => this.onLoadClick()}
      >
        Load
      </button>
    )
  );

  render() {
    const {
      isLoaded, posts, users, comments, errorMessage,
    } = this.state;

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>
        <h2>{errorMessage}</h2>

        {isLoaded
          ? <PostList posts={posts} users={users} comments={comments} />
          : this.showLoaderButton()}
      </div>
    );
  }
}
