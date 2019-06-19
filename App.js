import React, { Component } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { Search } from './components/Search';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: null,
      users: null,
      isTODOSLoaded: false,
      isUsersLoaded: false,
      loadingCount: 0,
      todosWithUsers: null,
      filteredTodosWithUsers: null,
      searchBy: ''
    };
  }

  loadData = () => {
    this.makeRequest(`${BASE_URL}/todos`, this.handleTODOsLoad);
    this.makeRequest(`${BASE_URL}/users`, this.handleUsersLoad);
  };

  handleTODOsLoad = xhr => () => {
    this.setState(prevState => ({
      todos: JSON.parse(xhr.responseText),
      isTODOSLoaded: true,
      loadingCount: prevState.loadingCount - 1,
    }));
  };

  handleUsersLoad = xhr => () => {
    this.setState(
      prevState => ({
        users: JSON.parse(xhr.responseText),
        isUsersLoaded: true,
        loadingCount: prevState.loadingCount - 1,
      }),
      this.checkData
    );
  };

  makeRequest(url, cb) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.addEventListener('load', cb(xhr));
    xhr.send();
    this.setState(prevState => ({ loadingCount: prevState.loadingCount + 1 }));
  }

  search = (event) => {
    const searchBy = event.target.value;

    this.setState(prevState => {
      const filteredTodosWithUsers = prevState.todosWithUsers.filter(todo => todo.title.includes(searchBy));
      return {
        searchBy,
        filteredTodosWithUsers,
      };
    });
  }

  checkData() {
    const { isTODOSLoaded, isUsersLoaded, users, todos } = this.state;
    if (isTODOSLoaded && isUsersLoaded) {
      const usersMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
      const todosWithUsers = todos.map(todo => ({ ...todo, user: usersMap[todo.userId] }));
      this.setState({
        filteredTodosWithUsers: todosWithUsers,
        todosWithUsers,
      });
    }

  }

  render() {
    const {
      isTODOSLoaded,
      isUsersLoaded,
      loadingCount,
      filteredTodosWithUsers,
      searchBy
    } = this.state;

    const isLoaded = isTODOSLoaded && isUsersLoaded && filteredTodosWithUsers !== null;
    const isLoading = loadingCount !== 0;

    const button = (
      <button
        type="button"
        disabled={isLoaded}
        onClick={this.loadData}
      >
        {isLoading ? 'Loading...' : 'Load data'}
      </button>
    );

    if (!isLoaded) {
      return button;
    }

    return (
      <>
        <Search search={this.search} value={searchBy} />
        {button}
        <TodoList todos={filteredTodosWithUsers} />
      </>
    );
  }
}

export default App;