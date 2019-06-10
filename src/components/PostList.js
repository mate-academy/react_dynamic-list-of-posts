import React from 'react';
import Post from './Post';
import CommentList from './CommentList';
import './envelope.css';
import './PostList.css';

export default class PostList extends React.Component {
  static loadUrl(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => data);
  }

  constructor(props) {
    super(props);
    this.state = {
      requested: false,
      loaded: false,
      data: [],
      filter: '',
    };
    this.loadData = this.loadData.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
  }

  loadData() {
    this.setState({
      requested: true,
    });

    Promise.all([
      PostList.loadUrl('https://jsonplaceholder.typicode.com/posts'),
      PostList.loadUrl('https://jsonplaceholder.typicode.com/users'),
      PostList.loadUrl('https://jsonplaceholder.typicode.com/comments'),
    ])
      .then(([posts, users, comments]) => this.setState({
        loaded: true,
        data: posts.map((post) => ({
          ...post,
          user: users.find(user => user.id === post.userId),
          comments: comments
            .filter(commentItem => commentItem.postId === post.id),
        })),
      }));
  }

  filterSearch(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  render() {
    if (!this.state.requested) {
      return (
        <section className="circle">
          <div className="envelope" onClick={this.loadData} />
        </section>
      );
    } if (this.state.loaded) {
      const filterPost = [];

      this.state.data.forEach((post) => {
        if (!this.state.filter) {
          filterPost.push(
            <article key={post.title}>
              <Post data={post} />
              <CommentList commetItem={post.comments} />
            </article>
          );
        } else if (post.title.includes(this.state.filter)
        || post.body.includes(this.state.filter)) {
          filterPost.push(
            <article key={post.title}>
              <Post data={post} />
            </article>
          );
        }
      });

      return (
        <div className="container">
          <input
            type="text"
            onChange={this.filterSearch}
            placeholder="Search"
          />
          {filterPost}
        </div>
      );
    }
    return <div className="Loading">Loading...</div>;
  }
}
