import React, { Component } from 'react';

import './App.css';
import PostList from './components/PostList/PostList';

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

export default class App extends Component {
  state = {
    isLoaded: false,
    isLoading: false,
    posts: [],
    users: [],
    comments: [],
  };

  async onLoadClick() {
    this.setState({ isLoading: true });

    try {
      const [fetchPosts, fetchUsers, fecthComments] = await Promise.all([
        fetch(postsUrl),
        fetch(usersUrl),
        fetch(commentsUrl),
      ]);

      const posts = await fetchPosts.json();
      const users = await fetchUsers.json();
      const comments = await fecthComments.json();

      this.setState({
        posts, users, comments, isLoaded: true,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('error');
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
      isLoaded, posts, users, comments,
    } = this.state;

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>

        {isLoaded
          ? <PostList posts={posts} users={users} comments={comments} />
          : this.showLoaderButton()}
      </div>
    );
  }
}
