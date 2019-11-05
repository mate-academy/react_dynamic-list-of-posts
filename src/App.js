import React from 'react';
import './App.css';

import {
  Dimmer, Loader, Segment, Button,
} from 'semantic-ui-react';

import { posts, users, comments } from './API/post-api';
import PostList from './components/PostList';

class App extends React.Component {
  state = {
    postList: null,
    isLoading: false,
    hasError: false,
  };

  loadData = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([posts, users, comments])
      .then(([postsList, usersList, commentsList]) => {
        this.setState({
          postList: postsList.map(post => ({
            ...post,
            user: usersList.find(user => user.id === post.userId),
            comments: commentsList.filter(comment => comment.postId === post.id),
          })),
          isLoading: false,
          hasError: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          hasError: true,
        });
      });
  };

  render() {
    const {
      postList,
      isLoading,
      hasError,
    } = this.state;

    if (isLoading) {
      return (
        <Segment id="loader">
          <Dimmer active>
            <Loader indeterminate>Preparing Posts</Loader>
          </Dimmer>
        </Segment>
      );
    }

    if (!isLoading && hasError) {
      return (
        <div className="load__fail">
          <h2> IF YOU SEE THIS, SOMETHING GOT WRONG, TRY TO RELOAD</h2>
          <Button className="before__load-button" onClick={this.loadData} negative>RELOAD</Button>
        </div>
      );
    }

    if (!postList) {
      return (
        <div className="before__load">
          <h2 className="before__load-text">WELCOME, YOU DON'T HAVE DATA YET</h2>
          <Button className="before__load-button" onClick={this.loadData} icon="play" content="Load Data" />
        </div>
      );
    }

    return (
      <div className="App">
        <PostList postsInfo={postList} />
      </div>
    );
  }
}

export default App;
