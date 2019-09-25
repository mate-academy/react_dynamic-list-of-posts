import React, { Component } from 'react';
import './App.css';
import PostList from './components/PostList/PostList';
import getPostsWithUsers from './getPostsWithUsers';
import getPostWithComments from './getPostWithComments';
import Search from './components/Search/Search';

const API_URL = 'https://jsonplaceholder.typicode.com/';

const getData = dataName => (
  fetch(`${API_URL}${dataName}`)
    .then(response => response.json())
);

class App extends Component {
  state = {
    postList: [],
    filteredList: [],
    isLoading: false,
    isLoaded: false,
    isError: false,
    buttonText: 'Load',
  }

  loadDataFromServer = () => {
    this.setState({
      buttonText: 'loading...',
      isLoading: true,
    });
    Promise.all([
      getData('comments'),
      getData('posts'),
      getData('users'),
    ])
      .then(([comments, posts, users]) => {
        this.setState({
          postList: getPostWithComments(
            getPostsWithUsers(posts, users), comments
          ),
          filteredList: getPostWithComments(
            getPostsWithUsers(posts, users), comments
          ),
          isLoaded: true,
          isError: false,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          buttonText: 'try again',
          isError: true,
          isLoading: false,
        });
      });
  };

  filterList = (searchStr) => {
    this.setState(prevState => ({
      filteredList: searchStr
        ? [...prevState.postList]
          .filter(post => (
            post.title.indexOf(searchStr) > 0
            || post.body.indexOf(searchStr) > 0
          ))
        : [...prevState.postList],
    }));
  }

  render() {
    const {
      filteredList,
      isLoaded,
      isLoading,
      isError,
      buttonText,
    } = this.state;

    if (!isLoaded) {
      return (
        <div>
          {isError
            ? <p>No Data :( Try again</p>
            : null
          }
          <button
            type="submit"
            disabled={isLoading}
            onClick={this.loadDataFromServer}
          >
            {buttonText}
          </button>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="header">
          <h1>Dynamic list of posts</h1>
          <h2>{`Posts: ${filteredList.length}`}</h2>
          <Search
            filterList={this.filterList}
          />
        </header>
        <PostList posts={filteredList} />
      </div>
    );
  }
}

export default App;
