import React from 'react';

import './App.css';

import PostList from './components/PostList/PostList';
import Header from './components/Header/Header';

const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

class App extends React.Component {
  state = {
    preparedPosts: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
  }

  loadData = () => (
    Promise.all([
      fetch(usersUrl),
      fetch(postsUrl),
      fetch(commentsUrl),
    ])
      .then(([usersData, postsData, commentsData]) => (
        Promise.all([
          usersData.json(), 
          postsData.json(), 
          commentsData.json()
        ])
      ))
  )

  getData = () => {
    this.setState({
      isLoading: true,
      isLoaded: false,
      hasError: false,
    });

    this.loadData()
      .then(([usersData, postsData, commentsData]) => {
        this.setState({
          preparedPosts: this.joinAllData(postsData, commentsData, usersData),
          isLoading: false,
          isLoaded: true,
        });
      })
      .catch(() => {
        this.setState({
          hasError: true,
          isLoading: false,
        });
      });
  }

  joinAllData = (posts, comments, users) => (
    posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }))
  )

  render() {
    const {
      preparedPosts,
      isLoading,
      isLoaded,
      hasError
    } = this.state;

    return (
      <>
        <Header
          isLoading={isLoading}
          isLoaded={isLoaded}
          hasError={hasError}
          getData={this.getData}
        />
        <PostList posts={preparedPosts} />
      </>
    );
  }
};

export default App;
