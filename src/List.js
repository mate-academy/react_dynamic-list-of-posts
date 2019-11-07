import React from 'react';

import Content from './Content';

async function load (url) {
  const response = await fetch(url);
  const items = await response.json();
  return items;
}

async function loadConect (commentsUrl, postsUrl, usersUrl) {
  const comments = await load(commentsUrl);
  const posts = await load(postsUrl);
  const users = await load(usersUrl);
  return posts.map(post =>{
    return {
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => post.id === comment.postId),
    }
  })
}

class List extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      posts: null,
      isLoaded: false,
    };

    this.loads = this.loads.bind(this);
  }

  async loads() {
    this.setState({
      isLoaded: true
    });
    const posts = await loadConect('https://jsonplaceholder.typicode.com/comments',
     'https://jsonplaceholder.typicode.com/posts',
     'https://jsonplaceholder.typicode.com/users');
    this.setState({
      posts,
    });
  }
  render() {
    return (
      <>
        <button hidden={this.state.isLoaded} onClick={() => this.loads()}>
        Load
        </button>
        <Content list={this.state} />
      </>
    );
  }
}

export default List;
