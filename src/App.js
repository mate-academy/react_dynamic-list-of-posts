import React, {Component}from 'react';
import './App.css';
import PostList from './components/PostList';
import Service from './service';


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
    this.setState({
      isLoading: true
    });
    const usersPromise = this.service.getUsers();
    const postsPromise = this.service.getPosts();
    const commentsPromise = this.service.getComments();
    await Promise.all([usersPromise, postsPromise, commentsPromise])
        .then(values => {
          this.setState({
              users: values[0],
              posts: values[1],
              comments: values[2],
              loaded: true,
              isLoading: false
          });
        });
  };

  render() {
    const {
      loaded,
      isLoading,
      users,
      posts,
      comments
    } = this.state;

    const button = (
      <button
        type="button"
        disabled={isLoading}
        onClick={this.downloadData}
      >
        {isLoading ? 'Loading...' : 'Load data'}
      </button>
    );
    if (!loaded && !isLoading) {
      return (
          button
      );
    }
    if (isLoading) {
      return (
        button
      );
    }
    if (loaded) {
      return (
          <PostList users={users}
                    posts={posts}
                    comments={comments}
          />
      );
    }
  }
}

export default App;
