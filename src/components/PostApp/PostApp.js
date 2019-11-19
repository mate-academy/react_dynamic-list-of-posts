import React, { Component } from 'react';
import PostList from '../PostList/PostList';

class PostApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      isLoading: false,
      error: false,
      filter: '',
    };
    this.loadPosts = this.loadPosts.bind(this);
  }

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

      const postsWithUsersAndComments = posts.map(post => ({
        ...post,
        user: users.find(user => user.id === post.userId),
        comments: comments.filter(comment => comment.postId === post.id),
      }));

      this.setState({ posts: postsWithUsersAndComments });
    } catch (e) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      posts, isLoading, error, filter,
    } = this.state;

    if (posts === null) {
      return (
        <>
          {error ? <p>Opps...Try again later.</p> : null}
          <button type="button" onClick={this.loadPosts}>
            {`Load${isLoading ? 'ing...' : ''}`}
          </button>
        </>
      );
    }

    const filteredPosts = this.state.posts.filter(post => (
      post.title.includes(filter) || post.body.includes(filter)));

    return (
      <>
        <input type="text" value={filter} onChange={this.onFilterChange} />
        <PostList posts={filteredPosts} />
      </>
    );
  }
}

export default PostApp;
