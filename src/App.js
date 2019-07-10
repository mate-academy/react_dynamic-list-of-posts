import React from 'react';
import { loadPosts, loadUsers, loadComments } from './api/API_DATA';
import './styles/App.css';
import PostList from './components/PostList';
import SearchField from './components/SearchField';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoaded: false,
      isLoading: false,
      search: '',
    };
  }

  LoadData = async() => {
    this.setState({
      isLoading: true,
    });

    const users = await loadUsers();
    const posts = await loadPosts();
    const comments = await loadComments();

    const postsWithCommentsAndUsers = posts.map(post => ({
      ...post,
      comments: comments.filter(comment => post.id === comment.postId),
      user: users.find(user => user.id === post.userId),
    }));

    this.setState({
      posts: postsWithCommentsAndUsers,
      isLoaded: true,
      isLoading: false,
    });
  }

  updateSearch = (event) => {
    this.setState({
      search: event.target.value.slice(0),
    });
  }

  render() {
    const filtredPosts = this.state.posts.filter(post => (
      post.body.toLowerCase()
        .indexOf(this.state.search.toLowerCase()) !== -1
      || post.title.toLowerCase()
        .indexOf(this.state.search.toLowerCase()) !== -1
    ));

    if (this.state.isLoaded) {
      return (
        <div className="App">
          <SearchField
            search={this.state.search}
            updateSearch={this.updateSearch}
          />
          <PostList filtredPosts={filtredPosts} />
        </div>
      );
    }
    return (
      <div className="button_load">
        <button className="button" onClick={this.LoadData} type="button">
          {this.state.isLoading ? 'Loading...' : 'Load'}
        </button>
      </div>
    );
  }
}

export default App;
