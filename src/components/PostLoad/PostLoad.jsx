import React, { Component } from 'react';
import PostList from '../PostList/PostList';

class PostLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      posts: null,
      comments: null,
      isLoading: false,
    };
    this.usersUrl = 'https://jsonplaceholder.typicode.com/users';
    this.postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    this.commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
    this.loadTodos = this.loadTodos.bind(this);
    this.getTodosWithUsers = this.getPostsWithUsersAndComments.bind(this);
    this.getDataFromServer = this.getDataFromServer.bind(this);
  }

  getPostsWithUsersAndComments = (postsList, usersList, commentsList) => {
    const usersMap = new Map();
    const commentsMap = new Map();

    usersList.forEach((user) => {
      usersMap.set(user.id, user);
    });
    commentsList.forEach((comment) => {
      const indicator = commentsMap.get(comment.postId);

      if (!indicator) {
        const commentMapValue = [];

        commentMapValue.push(comment);
        commentsMap.set(comment.postId, commentMapValue);
      } else {
        const commentMapValue = [...indicator];

        commentMapValue.push(comment);
        commentsMap.set(comment.postId, commentMapValue);
      }
    });

    return postsList.map(post => ({
      ...post,
      user: usersMap.get(post.userId),
      comments: commentsMap.get(post.id),
    }));
  }

  getDataFromServer = async url => fetch(url)
    .then(response => response.json());

  async loadTodos() {
    this.setState({
      isLoading: true,
    });
    const [users, posts, comments] = await Promise.all([
      this.getDataFromServer(this.usersUrl),
      this.getDataFromServer(this.postsUrl),
      this.getDataFromServer(this.commentsUrl),
    ]);

    this.setState({
      users,
      posts,
      comments,
      isLoading: false,
    });
  }

  render() {
    const {
      users,
      posts,
      comments,
      isLoading,
    } = this.state;

    return (!users || !posts || !comments) ? (
      <button type="button" onClick={this.loadTodos}>
        {isLoading ? 'Loading...' : 'Load'}
      </button>
    ) : (
      <PostList posts={this.getTodosWithUsers(posts, users, comments)} />
    );
  }
}

export default PostLoad;
