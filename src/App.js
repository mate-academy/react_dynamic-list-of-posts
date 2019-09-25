import React, { Component } from 'react';
import './App.css';
import PostList from './components/PostList/PostList'

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

  handleClick = async () => {
    this.setState({ isLoading: true }); // succesfully loading after handle click

    try {
      const [
        postsResponse, usersResponse, commentsResponse,
      ] = await Promise.all([
        fetch(`${URL}posts`),
        fetch(`${URL}users`),
        fetch(`${URL}comments`)
      ]);

      const posts = await postsResponse.json();
      const users = await usersResponse.json();
      const comments = await usersResponse.json(); // to json convert

      this.setState({
        posts, users, comments, isLoaded: true,
      });
    }
    catch (error) {
      this.setState({
        hasError: true,
        isLoading: false, // describes getting an error
      });
    }
  };

  render() {
    const textOnButton = (hasError ? 'Try Again' : 'Load');
    const {
      posts,
      users,
      comments,
      isLoaded,
      isLoading,
      hasError,
    } = this.state; // her par-rs;

    return (
      <div className="App">
        {isLoaded ? (
          <>
            <h1>Static list of posts</h1>
            <PostList
              posts={
                this.getFullPost(
                  posts, users, comments
                )
              }
            />
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
