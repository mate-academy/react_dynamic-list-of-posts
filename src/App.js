import React from 'react';
import PostList from './components/PostList/PostList';

import './App.css';

const COMMENTS_API_URL = 'https://jsonplaceholder.typicode.com/comments';
const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';

class App extends React.Component {
  state = {
    originalData: [],
    sortedData: [],
    users: [],
    sortedUsers: [],
    inputtedName: '',
    isLoading: false,
    isReady: true,
  }

  getList = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch(COMMENTS_API_URL),
      fetch(USERS_API_URL),
      fetch(POSTS_API_URL),
    ])
      .then(([res1, res2, res3]) => Promise.all([
        res1.json(),
        res2.json(),
        res3.json(),
      ]))
      .then(([comments, users, posts]) => this.setState({
        originalData: posts.map(post => ({
          ...post,
          comments: comments.filter(comment => comment.postId === post.id),
          user: users.reduce((acc, user) => (
            { ...acc, [user.id]: user }), {})[post.userId],
        })),
        sortedData: posts.map(post => ({
          ...post,
          comments: comments.filter(comment => comment.postId === post.id),
          user: users.reduce((acc, user) => (
            { ...acc, [user.id]: user }), {})[post.userId],
        })),
        users,
        sortedUsers: users,

        isLoading: false,
        isReady: false,
      }));
  };

  handleEnteredName = ({ target }) => {
    this.setState({
      inputtedName: target.value.toLowerCase(),
    });
    this.sortingDataByName(target.value.toLowerCase());
  }

  sortingDataByName = (inputtedName) => {
    this.setState(prevState => ({
      sortedData: [...prevState.originalData].filter(data => (
        data.user.name.toLowerCase().includes(inputtedName))),
      sortedUsers: [...prevState.users].filter(data => (
        data.name.toLowerCase().includes(inputtedName))),
    }));
  }

  showAllData = () => {
    this.setState(prevState => ({
      sortedData: [...prevState.originalData],
      inputtedName: '',
    }));
  }

  render() {
    const {
      isLoading, isReady, sortedData, inputtedName, sortedUsers,
    } = this.state;

    if (isLoading) {
      return (
        <div className="app">
          <p>Loading ...</p>
        </div>
      );
    }

    if (isReady) {
      return (
        <div className="app">
          <button type="button" onClick={this.getList}> Show posts </button>
        </div>
      );
    }

    return (
      <div className="app">
        <h1>Static list of posts</h1>
        <p>
          Posts:
          {sortedData.length}
        </p>
        <h2>Posted users name: </h2>
        {sortedUsers.map(person => <b>{person.name}<br/></b>)}
        <input
          onChange={this.handleEnteredName}
          value={inputtedName}
          placeholder=" input user name"
        />
        <button type="button" onClick={this.showAllData}>Show all</button>
        <PostList fullPosts={sortedData} />
      </div>
    );
  }
}

export default App;
