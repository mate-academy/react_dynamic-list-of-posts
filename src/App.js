import React from 'react';
import './App.css';

import PostList from './components/PostList';
import { getPosts, getUsers, getComments } from './api/getData';
import getPostsByFilter from './utils';

class App extends React.Component {
  state = {
    posts: [],
    shownPosts: [],
    isLoaded: false,
    isLoading: false,
  };

  handleLoadData = async() => {
    this.setState({
      isLoading: true,
    });

    const [posts, users, comments] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ]);

    const preparedPosts = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comment: comments.filter(comment => comment.postId === post.id),
    }));

    this.setState({
      posts: preparedPosts,
      shownPosts: preparedPosts,
      isLoaded: true,
      isLoading: false,
    });
  };

  handleSearch = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      shownPosts: getPostsByFilter(prevState.posts, value),
    }));
  };

  render() {
    return (
      <main className="main">

        { this.state.isLoaded ? (

          <PostList
            allPosts={this.state.shownPosts}
            handleSearch={this.handleSearch}
          />

        ) : (
          <button
            type="button"
            className="loadData"
            onClick={this.handleLoadData}
            disabled={this.state.isLoading}
          >
            {this.state.isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </main>
    );
  }
}

export default App;
