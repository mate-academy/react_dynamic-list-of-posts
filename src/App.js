import React, { Component } from 'react';
import './App.css';

import 'semantic-ui-css/semantic.min.css';
import { Button, Dimmer, Header } from 'semantic-ui-react';

import { getCommentsList, getPostsList, getUsersList } from './api';
import PostList from './components/postList/PostList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      hasError: false,
      isLoading: false,
    };

    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    Promise.all([getPostsList(), getUsersList(), getCommentsList()])
      .then(([postsList, usersList, commentsList]) => {
        this.setState({
          posts: [...postsList].map(post => ({
            ...post,
            user: usersList.find(user => user.id === post.userId),
            comments: commentsList.filter(com => com.postId === post.id),
          })),
          isLoading: false,
        },);
      }).catch(() => {
        this.setState({
          isLoading: false,
          hasError: true,
        });
      });
  }

  render() {
    const { hasError, isLoading, posts } = this.state;

    if (hasError) {
      return (
        <Dimmer
          active
        >
          <Header as="h2" inverted>
            Something went wrong
          </Header>

          <Button
            loading={isLoading}
            onClick={this.loadData}
            primary
          >
            Try again
          </Button>
        </Dimmer>
      );
    }

    if (!posts) {
      return (
        <Dimmer
          active
        >
          <Header as="div" inverted>
            <h2>Welcome. Push button to proceed.</h2>
          </Header>

          <Button
            loading={isLoading}
            onClick={this.loadData}
            primary
          >
            Load data
          </Button>
        </Dimmer>
      );
    }

    return (
      <div className="App">
        <PostList postData={posts} />
      </div>
    );
  }
}

export default App;
