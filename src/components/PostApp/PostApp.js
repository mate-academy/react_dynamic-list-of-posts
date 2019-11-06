import React, { Component } from 'react';
import PostList from '../PostList/PostList';

class PostApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      posts: null,
      comments: null,
      isLoading: false,
      error: false,
      filter: '',
    };
    this.loadPosts = this.loadPosts.bind(this);
  }

  getPostsWithUsersAndComments = (postList, usersList, commentList) => {
    const iterator = post => ({
      ...post,
      user: usersList.find(user => user.id === post.userId),
      comments: commentList.filter(comment => comment.postId === post.id),
    });

    return postList.map(iterator);
  };

  onFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  getDatafromServer = async url => fetch(url)
    .then(response => response.json());

  async loadPosts() {
    this.setState({
      isLoading: true,
      error: false,
      filter: '',
    });
    try {
      const [users, posts, comments] = await Promise.all([
        this.getDatafromServer('https://jsonplaceholder.typicode.com/users'),
        this.getDatafromServer('https://jsonplaceholder.typicode.com/posts'),
        this.getDatafromServer('https://jsonplaceholder.typicode.com/comments'),
      ]);

      this.setState({ users, posts, comments });
    } catch (e) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      users, posts, comments, isLoading, error, filter,
    } = this.state;

    if (users === null || posts === null || comments === null) {
      return (
        <>
          {error ? <p>Opps...Try again later.</p> : null}
          <button type="button" onClick={this.loadPosts}>
            {`Load${isLoading ? 'ing...' : ''}`}
          </button>
        </>
      );
    }

    const postsWithUsersAndComments = this
      .getPostsWithUsersAndComments(posts, users, comments)
      .filter(post => (
        post.title.includes(filter) || post.body.includes(filter)));

    return (
      <>
        <input type="text" value={filter} onChange={this.onFilterChange} />
        <PostList posts={postsWithUsersAndComments} />
      </>
    );
  }
}

export default PostApp;
