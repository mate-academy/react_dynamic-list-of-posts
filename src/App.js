import React from 'react';
import './App.css';
import PostList from './components/PostList/PostList';
import NameList from './components/NameList/NameList';

class App extends React.Component {
  state = {
    sortedData: [],
    originalData: [],
    users: [],
    inputtedName: '',
    isLoading: false,
    isReady: true,
  };

  getListFromApi = () => {
    this.setState({
      isLoading: true,
    });

    const getData = async (url) => {
      const response = await fetch(url);
      return response.json();
    };

    Promise.all([
      getData('https://jsonplaceholder.typicode.com/comments'),
      getData('https://jsonplaceholder.typicode.com/users'),
      getData('https://jsonplaceholder.typicode.com/posts')])
      .then(([comments, users, posts]) => {
        const data = posts.map(post => ({
          ...post,
          comments: comments.filter(comment => comment.postId === post.id),
          user: users.reduce((acc, user) => (
            { ...acc, [user.id]: user }), {})[post.userId],
        }));
        this.setState({
          sortedData: data,
          originalData: data,
          users,
          isLoading: false,
          isReady: false,
        })}
      )
  };

  handleEnterName = ({target}) => {
    const valueOfLowerCase = target.value.toLowerCase();
    this.setState({
      inputtedName: valueOfLowerCase,
    });
    this.sortingByName(valueOfLowerCase);
  };

  sortingByName = (inputtedName) => {
    this.setState(prevState => ({
      sortedData: prevState.originalData.filter(data => (
        data.user.name.toLowerCase().includes(inputtedName))),
    }));
  };

  showAllData = () => {
    this.setState(prevState => ({
      sortedData: prevState.originalData,
      inputtedName: '',
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
          <button type="button" onClick={this.getListFromApi}>
            Show posts
          </button>
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
        {users.map(person =>
          <NameList person={person.name} key={person.id} />)}
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
        <button type="button"
          onClick={this.showAllData}
          className="ui primary button">Show all</button>
        <PostList fullPosts={sortedData} />
      </div>
    );
  }
}

export default App;
