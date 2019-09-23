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
      const response = await Promise.all([
        fetch(postsUrl),
        fetch(usersUrl),
        fetch(commentsUrl),
      ]);

      const posts = await response[0].json();
      const users = await response[1].json();
      const comments = await response[2].json();

      this.setState({
        posts, users, comments, isLoaded: true,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error');
    }
  }

  render() {
    const {
      isLoaded, isLoading, posts, users, comments,
    } = this.state;

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>

        {isLoaded
          ? <PostList posts={posts} users={users} comments={comments} />
          : isLoading
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
        }
      </div>
    );
  }
}
