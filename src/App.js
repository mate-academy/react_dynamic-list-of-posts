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

        isLoading: false,
        isReady: false,
      }));
  };

  handleEnteredName = (event) => {
    this.setState({
      inputtedName: event.target.value,
    });
  }

sortingDataByName = (event) => {
  const { inputtedName } = this.state;

  event.preventDefault();

  this.setState(prevState => ({
    sortedData: [...prevState.originalData].filter(data => (
      data.user.name === inputtedName)),
    inputtedName: '',
  }));
}

showAllData = () => {
  this.setState(prevState => ({
    sortedData: [...prevState.originalData],
  }));
}

render() {
  const {
    isLoading,
    isReady,
    sortedData,
    inputtedName,
    users,
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
      {users.map(person => <b>{person.name}<br/></b>)}
      <form onSubmit={this.sortingDataByName}>
        <input
          onChange={this.handleEnteredName}
          value={inputtedName}
          placeholder=" input user name"
        />
        <button type="submit">Search</button>
      </form>
      <button type="button" onClick={this.showAllData}>Show all</button>
      <PostList fullPosts={sortedData} />
    </div>
  );
}
}

export default App;
