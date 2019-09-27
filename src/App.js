import React, { Component } from 'react';

import './App.css';
import PostList from './components/PostList/PostList';

const BASE_URL = `https://jsonplaceholder.typicode.com`;

export default class App extends Component {
  state = {
    postsAll: [],
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

      this.postsAll = [...posts];

      this.setState({
        postsAll: posts,
        posts,
        users,
        comments,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }
  }

  handleSearch = ({ value }) => {
    this.setState(({ postsAll }) => ({
      posts: postsAll.filter((post) => {
        const regex = new RegExp(`${value}`, 'i');

        return regex.test(post.title);
      }),
    }));
  };

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
          ? (
            <>
              <section className="search-section">
                <div className="container">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="basic-addon1"
                      >
                        <span role="img" aria-label="search">🔎</span>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search...(case ignore)"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => this.handleSearch(e.target)}
                    />
                  </div>
                </div>
              </section>

              <PostList posts={posts} users={users} comments={comments} />
            </>
          )
          : this.showLoaderButton()}
      </div>
    );
  }
}
