import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';

import { getPosts, getUsers, getComments } from './Api';
import PostsList from './components/postslist/PostsList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      users: [],
      comments: [],
      isLoading: false,
      hasError: false,
      dataReceived: false,
    }
  }

  loadData = () => {
    this.setState({ isLoading: true })

    Promise.all([getPosts(), getUsers(), getComments()])
      .then((postsUsersComments) =>
        this.setState(prev => {
          return {
            ...prev,
            posts: postsUsersComments[0],
            users: postsUsersComments[1],
            comments: postsUsersComments[2],
            isLoading: false,
            dataReceived: true,
            hasError: false,
          }
        })
      )
      .catch(() => this.setState({ hasError: true }))
      .finally(() => this.setState({ isLoading: false }))
  }

  render() {
    const {
      dataReceived,
      isLoading,
      hasError,
      posts,
      users,
      comments,
    } = this.state;

    if (!dataReceived && !hasError) {

      return (
        <div className="start-button">
          {
            isLoading
            ? <Button loading></Button>
            : <Button onClick={this.loadData}>Load</Button>
          }
        </div>
      );
    } else if (hasError) {

      return (
        <div className="start-button">
          <h3>Sorry! We have some problem with connection to server, please load data again.</h3>
            {
              isLoading
              ? <Button loading></Button>
              : <Button onClick={this.loadData}>Load</Button>
            }
        </div>
      );
    } else {

      return (
        <PostsList posts={posts} users={users} comments={comments}/>
      )
    }
  }
}
export default App;

