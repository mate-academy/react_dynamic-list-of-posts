import React, { Component } from 'react';
import './App.css';

import PostList from './components/PostList/PostList';

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

class App extends Component {
  state = {
    comments: [],
    posts: [],
    users: [],
    hasError: false,
    isLoading: false,
    isLoaded: false,
  }

  getPostsWithUserAndComments = (
    postList,
    userList,
    commentList
  ) => postList.map(post => ({
    ...post,
    user: userList.find(user => user.id === post.userId),
    comments: commentList.filter(comment => comment.postId === post.id),
  }));

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

      this.setState({
        posts,
        users,
        comments,
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
      users,
      comments,
      isLoaded,
      isLoading,
      hasError,
    } = this.state;

    return (
      <div className="App">
        {isLoaded ? (
          <>
            <h1 className="title">Static list of posts</h1>
            <PostList posts={
              this.getPostsWithUserAndComments(
                posts,
                users,
                comments
              )}
            />
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
