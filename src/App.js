import React, {Component}from 'react';
import './App.css';
import PostList from './components/PostList';
import Service from './components/service';


class App extends Component {
  service = new Service();
  state = {
    users: null,
    posts: null,
    comments: null,
    loaded: false,
    isLoading: false
  };

  downloadData = async () => {
    this.setState(state => {
      return {
        ...state,
        isLoading: true
      }
    });
    const usersPromise = this.service.getUsers();
    const postsPromise = this.service.getPosts();
    const commentsPromise = this.service.getComments();
    await Promise.all([usersPromise, postsPromise, commentsPromise])
        .then(values => {
          this.setState(state => {
            return {
              ...state,
              users: values[0],
              posts: values[1],
              comments: values[2],
              loaded: true,
              isLoading: false
            }
          })
        });
  };

  render() {
    if (!this.state.loaded && !this.state.isLoading) {
      return (
          <button onClick={this.downloadData}>
            Load
          </button>
      )
    }
    if (this.state.isLoading) {
      return (
          <button disabled={true}>
            Loading...
          </button>
      )
    }
    if (this.state.loaded) {
      return (
          <PostList users={this.state.users}
                    posts={this.state.posts}
                    comments={this.state.comments}
          />
      );
    }
  }
}

export default App;
