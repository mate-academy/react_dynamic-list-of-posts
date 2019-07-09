import React from 'react';
import './App.css';

import PostList from './components/PostList';
import getData from './api/getData';

let currentList = [];
const myUrl = 'https://jsonplaceholder.typicode.com';

const getPostsByFilter = (posts, searchText) => {
  const filteringPosts = [...posts].filter(post => (
    (post.title.includes(searchText) || post.body.includes(searchText))
  ));
  return filteringPosts;
};

class App extends React.Component {
  state = {
    posts: [],
    isLoaded: false,
    isLoading: false,
  };

  async componentDidMount() {
    currentList = await getData(myUrl);
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    document.getElementsByClassName('loadData').disabled = true;

    setTimeout(() => {
      this.setState({
        posts: currentList,
        isLoaded: true,
        isLoading: false,
      });
    }, 0);
  };

  onChange = (event) => {
    this.setState({
      posts: getPostsByFilter(currentList, event.target.value),
    });
  };

  render() {
    return (
      <main className="main">

        { this.state.isLoaded ? (

          <PostList
            allPosts={this.state.posts}
            onChange={this.onChange}
          />

        ) : (
          <button
            type="button"
            className="loadData"
            onClick={this.handleClick}
          >
            {this.state.isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </main>
    );
  }
}

export default App;
