import React from 'react';
import './App.css';
import { getDataUsers, getDataPosts, getDataComments } from './FromServerData';
import PostList from './PostList';

class App extends React.Component {
  state = {
    currentPost: [],
    isLoading: false,
    isLoaded: false,
    originalPosts: [],
  };

  onClickLoad = async() => {
    this.setState({
      isLoading: true,
    });

    const users = await getDataUsers();
    const posts = await getDataPosts();
    const comments = await getDataComments();

    const preparedPosts = posts.map(post => ({
      ...post,
      comments: comments.filter(comment => post.id === comment.postId),
      user: users.find(user => user.id === post.userId),
    }));

    this.setState({
      currentPost: preparedPosts,
      originalPosts: preparedPosts,
      isLoaded: true,
      isLoading: false,
    });
  }

  handleSearch = (someType) => {
    const search = someType.target.value;

    this.setState(prevState => ({
      currentPost: prevState.originalPosts.filter(
        text => [text.title, text.body]
          .join('')
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    }));
  }

  render() {
    return (
      <div>
        { this.state.isLoaded ? (
          <div className="App">
            <input
              type="text"
              className="search_input"
              placeholder="Search"
              onChange={this.handleSearch}
            />
            <PostList currentPost={this.state.currentPost} />
          </div>
        ) : (
          <button type="button" onClick={this.onClickLoad}>
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
      </div>
    );
  }
}

export default App;
