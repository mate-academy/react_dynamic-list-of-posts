import Post from './Post';
import CommentList from './CommentList'

import React, { Component } from 'react'

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      comments: [],
      posts: []
    }
  }

  componentDidMount() {
    debugger;
    const xhrUsers = new XMLHttpRequest();
    xhrUsers.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhrUsers.addEventListener('load', () => {
      this.setState({
        users: JSON.parse(xhrUsers.response)
      })
    });
    xhrUsers.send();
    
    const xhrPosts = new XMLHttpRequest();
    xhrPosts.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhrPosts.addEventListener('load', () => {
      this.setState({
        posts: JSON.parse(xhrPosts.response)
      })
    });
    xhrPosts.send()

    const xhrComments = new XMLHttpRequest();
    xhrComments.open('GET', 'https://jsonplaceholder.typicode.com/comments');
    xhrComments.addEventListener('load', () => {
      this.setState({
        comments: JSON.parse(xhrComments.response)
      })
    });
    xhrComments.send();
  }
  render() { 
      const postsList = this.state.posts.map(post => {
      const user = this.state.users.find(user => user.id === post.userId);
      return (
      <section key={post.title} className ='Post'>
        <Post title={post.title} body={post.body} user={user} />
        <section className='CommentList'>
        <CommentList comments={this.state.comments} postId={post.id} />
        </section>
      </section>
      );
    })
    return (
      <div className='PostList'>
        {postsList}
      </div>
    );
  }
}
