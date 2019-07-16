import React from 'react';
import './App.css';
import getFromServer from './Get';
import PostList from './PostList';

class App extends React.Component {
  state = {
    loadedPosts: [],
    postTemplate: [],
    isLoaded: false,
    isLoading: false,
  };

handleLoad = async() => {
  this.setState({
    isLoading: true,
  });
  const PostsWithUserAndComments = await getFromServer();
  setTimeout(() => {
    this.setState({
      loadedPosts: [...PostsWithUserAndComments],
      postTemplate: [...PostsWithUserAndComments],
      isLoaded: true,
    });
  }, 1000);
};

handleInputSearch = (event) => {
  const { value } = event.target;
  this.setState (state => ({
    loadedPosts: state.postTemplate
      .filter((post) => {
        return (post.title && post.body).toLowerCase()
          .includes(value
            .toLowerCase()
            .trim());
      }),
  }));
};

render() {
  if (!this.state.isLoaded) {
    return (
      <button
        className="app_load-button"
        type="button"
        onClick={this.handleLoad}
        hidden={this.state.isLoaded}
      >
        {this.state.isLoading ? 'Loading...' : 'Load'}
      </button>
    );
  }
  return (
    <div className="app">
      <div>
        <label>
          <input
            type="text"
            placeholder="Search post by body or title..."
            onChange={this.handleInputSearch}
            className="app_search-input"
          />
        </label>
      </div>
      <PostList loadedPosts={this.state.loadedPosts} />
    </div>
  );
}
}

export default App;
