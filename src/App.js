import React from 'react';

import PostList from './components/PostList/PostList';
import './App.css';

const API_POSTS = 'https://jsonplaceholder.typicode.com/posts';
const API_USER = 'https://jsonplaceholder.typicode.com/users';
const API_COMMENTS = 'https://jsonplaceholder.typicode.com/comments';

class App extends React.Component {
  state = {
    listOfPosts: [],
    comments: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
  };

  loadData = async() => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    try {
      const [
        postsFromApi,
        usersFromApi,
        commentsFromApi,
      ] = await Promise.all([
        fetch(API_POSTS),
        fetch(API_USER),
        fetch(API_COMMENTS),
      ]);

      const posts = await postsFromApi.json();
      const users = await usersFromApi.json();
      const comments = await commentsFromApi.json();
      const listOfPosts = posts.map(post => ({
        ...post,
        user: users.find(user => (user.id === post.userId)),
      }));

      this.setState({
        listOfPosts,
        comments,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
      });
    }

    this.setState({
      isLoading: false,
    });
  }

  render() {
    const {
      listOfPosts, isLoading, isLoaded, hasError, comments,
    } = this.state;

    return (
      <div className="App">
        <h1 className="app-title">Dynamic list of posts</h1>
        {isLoaded ? (
          <PostList posts={listOfPosts} comments={comments} />
        ) : (
          <>
            {hasError && (
              <h2 className="error">Error was find! Please, try again!</h2>
            )}
            <button
              type="button"
              onClick={this.loadData}
              className="info-load"
            >
              {isLoading ? 'Loading...' : 'Load posts'}
            </button>
          </>
        )}
      </div>
    );
  }
}

export default App;
