import React, { Component } from 'react';
import './App.css';

import LoadButton from './components/LoadButton/LoadButton';
import PostList from './components/PostList/PostList';

import fetchData from './components/fetchData';

class App extends Component {
  state = {
    postList: [],
    sortedPostList: [],
    isLoaded: false,
    isLoading: false,
  };

  handleLoad = async() => {
    try {
      this.setState({ isLoading: true });

      const users = await fetchData('users');
      const comments = await fetchData('comments');
      const posts = await fetchData('posts');

      const currentPosts = posts.map(post => ({
        ...post,
        user: users.find(user => user.id === post.userId),
        comments: comments.filter(comment => comment.postId === post.id),
      }));

      this.setState({
        postList: currentPosts,
        sortedPostList: currentPosts,
        isLoading: false,
        isLoaded: true,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  handleSort = (event) => {
    const { value } = event.target;
    const callback = post => (
      post.body.includes(String(value))
        || post.title.includes(String(value))
    );

    this.setState(prevState => ({
      sortedPostList: prevState.postList.filter(callback),
    }));
  }

  render() {
    const { sortedPostList, isLoading } = this.state;
    return (
      <main className="container">
        <h1 className="container__header">List of posts</h1>
        {
          this.state.isLoaded
            ? (
              <PostList
                posts={sortedPostList}
                handleSort={this.handleSort}
              />
            ) : (
              <LoadButton
                isLoading={isLoading}
                handleLoad={this.handleLoad}
              />
            )
        }
      </main>
    );
  }
}

export default App;
