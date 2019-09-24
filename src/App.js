import React, { Component } from 'react';
import Button from './components/Button/Button';
import PostList from './components/PostList/PostList';

import './App.css';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

class App extends Component {
  state = {
    posts: [],
    users: [],
    comments: [],
    isLoading: false,
  };

  handleShow = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch(POSTS_URL),
      fetch(USERS_URL),
      fetch(COMMENTS_URL),
    ])
      .then(([resPosts, resUsers, resComments]) => Promise.all(
        [resPosts.json(), resUsers.json(), resComments.json()]
      ))
      .then(([dataPosts, dataUsers, dataComments]) => this.setState({
        posts: dataPosts,
        users: dataUsers,
        comments: dataComments,
        isLoading: false,
      }));
  };

  usersMap = users => (
    users.reduce((acc, item) => ({ ...acc, [item.id]: item }), {})
  )

  getPostsWithComments = (postsList, commentsList) => (
    postsList
      .map(post => ({
        ...post,
        comments: commentsList.filter(comment => comment.postId === post.id),
        user: this.usersMap[post.userId],
      }))
  );

  render() {
    const {
      posts,
      comments,
      users,
      isLoading,
    } = this.state;

    console.log('this.state: ', this.state);

    const preparedPosts = this.getPostsWithComments(posts, comments, users);

    console.log('users: ', users);

    // console.log('preparedPosts: ', preparedPosts);

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>
        {posts.length === 0
          ? (
            <>
              {isLoading
                ? <p>Loading...</p>
                : ''
              }
              <div>
                <Button
                  className="btn--start"
                  text="Load"
                  onClick={this.handleShow}
                />
              </div>
            </>
          )
          : <PostList posts={preparedPosts} />
        }
        {/* <PostList posts={preparedPosts} /> */}
      </div>
    );
  }
}

export default App;
