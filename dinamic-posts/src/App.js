import React, {Component} from 'react';
// import './App.css';
import PostList from './components/PostList';

const serverUrl = 'https://jsonplaceholder.typicode.com/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      users: null,
      comments: null,
      postList: null
    }
    this.loadData();
  }

  isLoading() {
    return !this.state.posts || !this.state.users || !this.state.comments;
  }

  isLoaded() {
    return this.state.postList !== null;
  }

  checkData() {
    if (this.isLoading()) return;
    const postsListMap = this.state.posts.map(post => ({...post,
      user: this.state.users.find(user => user.id === post.userId),
      postComments: this.state.comments.filter(comment => comment.postId === post.id) }));
      console.log(postsListMap.length);
    this.setState(state => ({
      postList: postsListMap
    }));
  }

  sendRequest(url, handler) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', handler(request));
    request.send();
  }

  requestPostsHandler = request => () => {
    const parsePosts = JSON.parse(request.responseText);
    this.setState(state => ({
      posts: parsePosts
    }));
    this.checkData();
  }

  requestUsersHandler = request => () => {
    const parseUsers = JSON.parse(request.responseText);
    this.setState(state => ({
      users: parseUsers
    }));
    this.checkData();
  }

  requestCommentsHandler = request => () => {
    const parseComments = JSON.parse(request.responseText);
    this.setState(state => ({
      comments: parseComments
    }));
    this.checkData();
  }

  loadData() {
    this.sendRequest(`${serverUrl}posts`, this.requestPostsHandler);
    this.sendRequest(`${serverUrl}users`, this.requestUsersHandler);
    this.sendRequest(`${serverUrl}comments`, this.requestCommentsHandler);
  }

  render() {
    console.log('');
    if(this.isLoaded()) {
      return (
        <div className="App">
          <h1>Post List</h1>
          <PostList posts={this.state.postList} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>Post List</h1>
          <p>Loading...</p>
        </div>
      );
    }
  }

}

export default App;
