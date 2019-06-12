import React from 'react';
import Post from './Post';

export default class PostList extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
     items: []
    }
    this.getData = this.getData.bind(this);
    this.sortItem = this.sortItem.bind(this);
  }

  loadURL(url) {
    return fetch(url)
    .then(response => response.json())
    .then(data => data)
  }

  getData() {
    Promise.all([
      this.loadURL('https://jsonplaceholder.typicode.com/posts'),
      this.loadURL('https://jsonplaceholder.typicode.com/users'),
      this.loadURL('https://jsonplaceholder.typicode.com/comments'),
    ])
    .then(([posts, users, comments]) => {
      this.setState({
        items: posts.map((post) => ({ ...post,
        user: users.find(user => user.id === post.userId),
        comments: comments.filter(commentItem => commentItem.postId === post.id),
        }))
      });
    });
  } 
  
  sortItem() {
    this.setState(sort => ({
      items: sort.items.sort((a, b) => a.title.localeCompare(b.title))
    }))
  }
 
  render() {
    return (
      <div className="post">
        <button onClick={this.getData}>Load..</button>
        <button onClick={this.sortItem}>Sort</button>
        <h1>{this.state.items.length}</h1>
        {this.state.items.map(post =>
          <Post post={post} key={post.id}/>
        )}
      </div>
    )
  }
}
