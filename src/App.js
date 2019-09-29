import React, { Component } from 'react';
import './App.css';

import PostList from './components/PostList/PostList';

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

class App extends Component {
  state = {
    posts: [],
    hasError: false,
    isLoading: false,
    isLoaded: false,
  }

  handleClick = async() => {
    this.setState({ isLoading: true });

    try {
      const [
        postsResponse,
        usersResponse,
        commentsResponse,
      ] = await Promise.all([
        fetch(postsUrl),
        fetch(usersUrl),
        fetch(commentsUrl),
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
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        isLoading: false,
      });
    }
  };

  render() {
    const {
      posts,
      isLoaded,
      isLoading,
      hasError,
    } = this.state;

    return (
      <div className="App">
        {isLoaded ? (
          <>
            <h1 className="title">Static list of posts</h1>
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
