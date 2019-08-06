import React, { Component } from 'react';
import './App.css';
import { PostList } from "./components/PostList";
import { Search } from './components/Search';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      users: null,
      comments: null,
      isPOSTSLoaded: false,
      isUsersLoaded: false,
      isCommentsLoaded: false,
      loadingCount: 0,
      postsWithUsers: null,
      filteredPostsWithUsers: null,
      searchBy: ''
    };
  }

  loadData = () => {
    this.makeRequest(`${BASE_URL}/posts`, this.handlePOSTsLoad);
    this.makeRequest(`${BASE_URL}/users`, this.handleUsersLoad);
    this.makeRequest(`${BASE_URL}/comments`, this.handleCommentsLoad);
  };

  handlePOSTsLoad = xhr => () => {
    this.setState(prevState => ({
      posts: JSON.parse(xhr.responseText),
      isPOSTSLoaded: true,
      loadingCount: prevState.loadingCount - 1,
    }
    ));
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

  handleCommentsLoad = xhr => () => {
    this.setState(
      prevState => ({
        comments: JSON.parse(xhr.responseText),
        isCommentsLoaded: true,
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
       const filteredPostsWithUsers = prevState.postsWithUsers.filter(post => post.title.includes(searchBy) || post.body.includes(searchBy));
       return {
         searchBy,
         filteredPostsWithUsers
       };
     });
   }

  checkData() {
    const { isPOSTSLoaded, isUsersLoaded, isCommentsLoaded, comments, users, posts } = this.state;
    if (isPOSTSLoaded && isUsersLoaded && isCommentsLoaded) {
      const usersMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
      const postsWithUsers = posts.map(post => ({ ...post, user: usersMap[post.userId] }));
      this.setState({
        filteredPostsWithUsers: postsWithUsers,
        postsWithUsers,
        comments
      });
    }

  }

  render() {
    const {
      isPOSTSLoaded,
      isUsersLoaded,
      isCommentsLoaded,
      loadingCount,
      filteredPostsWithUsers,
      searchBy,
      comments
    } = this.state;

    const isLoaded = isPOSTSLoaded && isUsersLoaded && isCommentsLoaded && filteredPostsWithUsers !== null;
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
        <PostList postsWithUsers={filteredPostsWithUsers} comments={comments}/>
      </>
    );
  }
}

export default App; 