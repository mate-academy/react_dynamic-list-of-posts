import React from 'react';
import './App.css';
import PostList from './components/PostList/PostList';

class App extends React.Component {
  state = {
    originalData: [],
    sortedData: [],
    users: [],
    inputtedName: '',
    isLoading: false,
    isReady: true,
  };

  getListFromApi = () => {
    this.setState({
      isLoading: true,
    });
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/comments'),
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch(' https://jsonplaceholder.typicode.com/posts'),
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

  handleEnterName = ({target}) => {
    this.setState({
      inputtedName: target.value.toLowerCase(),
    });
    this.sortingDataByName(target.value.toLowerCase());
  };

  sortingByName = (inputtedName) => {
    this.setState(prevState => ({
      sortedData: [...prevState.originalData].filter(data => (
        data.user.name.toLowerCase().includes(inputtedName))),
      sortedUsers: [...prevState.users].filter(data => (
        data.name.toLowerCase().includes(inputtedName))),
    }));
  };

  showAllData = () => {
    this.setState(prevState => ({
      sortedData: [...prevState.originalData],
    }));
  };

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
          <button type="button" onClick={this.getListFromApi}> Show posts </button>
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
        <form onSubmit={this.sortingByName} className="form">
          <div className="ui left icon input">
          <input
            onChange={this.handleEnterName}
            value={inputtedName}
            type="text"
            placeholder="Search users..."
          />
            <i aria-hidden="true" className="users icon"></i>
            </div>
          <button type="submit" class="ui primary button">Search</button>
        </form>
        <button type="button" onClick={this.showAllData} class="ui primary button">Show all</button>
        <PostList fullPosts={sortedData} />
      </div>
    );
  }
}

export default App;
