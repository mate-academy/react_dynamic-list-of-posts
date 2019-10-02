import React, { Component } from 'react';
import './App.css';

import PostList from './components/PostList/PostList';

const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_API_URL = 'https://jsonplaceholder.typicode.com/comments';
const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

class App extends Component {
  state = {
    posts: [],
    originalPosts: [],
    hasError: false,
    isLoading: false,
    isLoaded: false,
    inputValue: '',
  }

  handleClick = async() => {
    this.setState({ isLoading: true });

    try {
      const [
        postsResponse,
        usersResponse,
        commentsResponse,
      ] = await Promise.all([
        fetch(POSTS_API_URL),
        fetch(USERS_API_URL),
        fetch(COMMENTS_API_URL),
      ]);

      const posts = await postsResponse.json();
      const users = await usersResponse.json();
      const comments = await commentsResponse.json();

      const preparedPosts = posts
        .map(post => ({
          ...post,
          user: users.find(user => user.id === post.userId),
          comments: comments.filter(comment => comment.postId === post.id),
        }));

      this.setState({
        posts: preparedPosts,
        originalPosts: preparedPosts,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        isLoading: false,
      });
    }
  };

  handleInputFilter = ({ target }) => {
    this.setState(({ originalPosts }) => ({
      inputValue: target.value,
      posts: originalPosts
        .filter(({ title }) => title.includes(target.value)),
    }));
  }

  handleResetPosts = () => {
    this.setState(({ originalPosts }) => ({
      inputValue: '',
      posts: originalPosts,
    }));
  }

  render() {
    const {
      posts,
      isLoaded,
      isLoading,
      hasError,
      inputValue,
    } = this.state;

    return (
      <div className="app">
        {isLoaded ? (
          <>
            <h1 className="title">Dynamic list of posts</h1>
            <p>
              Posts:
              {posts.length}
            </p>
            <input
              type="text"
              onChange={this.handleInputFilter}
              value={inputValue}
              className="filter__input"
            />
            <button type="button" onClick={this.handleResetPosts}>Reset</button>
            <PostList posts={posts} />
          </>
        ) : (
          <>
            <h1 className="title">
              {hasError ? 'Error: Failed to fetch' : 'Load Posts'}
            </h1>
            <button type="button" onClick={this.handleClick}>
              {isLoading ? 'Loading...' : hasError ? 'Try Again' : 'Load'}
            </button>
          </>
        )}
      </div>
    );
  }
}

export default App;
