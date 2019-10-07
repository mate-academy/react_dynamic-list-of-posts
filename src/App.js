import React, { Component } from 'react';
import './App.css';
import PostList from './components/PostList/PostList';

const URL = 'https://jsonplaceholder.typicode.com/';

class App extends Component {
  state = {
    comments: [],
    posts: [],
    users: [],
    hasError: false,
    isLoading: false,
    isLoaded: false,
  }

  getFullPost = (
    postList, userList, commentsList
  ) => postList.map(post => ({
    ...post,
    user: userList.find(user => user.id === post.userId),
    comments: commentsList.filter(comment => comment.postId === post.id),
  }));

  handleClick = async() => {
    this.setState({ isLoading: true });

    try {
      const [
        postsResponse, usersResponse, commentsResponse,
      ] = await Promise.all([
        fetch(`${URL}posts`),
        fetch(`${URL}users`),
        fetch(`${URL}comments`),
      ]);

      const posts = await postsResponse.json();
      const users = await usersResponse.json();
      const comments = await commentsResponse.json(); // to json convert

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
    const textOnButton = (hasError ? 'Try Again' : 'Load');

    return (
      <div className="App">
        {isLoaded ? (
          <>
            <h1>Dynamic list of posts</h1>
            <PostList posts={posts} />
          </>
        ) : (
          <>
            <h1>
              {hasError ? 'Error - failed to fetch' : 'Load Posts'}
            </h1>
            <button type="button" onClick={this.handleClick}>
              {isLoading ? 'Loading..' : textOnButton}
            </button>
          </>
        )
        }
      </div>
    );
  }
}

export default App;
