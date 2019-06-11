import React, { Component } from 'react';
import Post from './Post';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      requested: false,
      items: [],
      filter: ''
    }
    this.getItem = this.getItem.bind(this);
  }

  loadUrl(url) {
    return fetch(url)
      .then(response => response.json()).then(response => response);
  }

  getItem() {
    this.setState({
      requested: true
    })

    Promise.all([
      this.loadUrl('https://jsonplaceholder.typicode.com/posts'),
      this.loadUrl('https://jsonplaceholder.typicode.com/users'),
      this.loadUrl('https://jsonplaceholder.typicode.com/comments')
    ]).then(([posts, user, comments]) => this.setState({
      loaded: true,
      items: posts.map((post) => ({
        ...post,
        users: user.find(oneUser => oneUser.id === post.userId),
        comments: comments.find(commentItem => commentItem.postId === post.userId),

      }))
    }));
  }
 
  filterChanged(event) {
   this.setState({
    filter: event.target.value
   });
  }
  render() {
    if (!this.state.requested) {
      return <div> <button className='btn' onClick={this.getItem}>
        {this.state.requested ? 'loading' : 'load data'}</button>
      </div>
    } else if (this.state.loaded) {
      const filteredPost = [];
      if (!this.state.filter) {
      filteredPost.push(<table>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>POST BODY</th>
            <th>AUTHOR NAME</th>
            <th>AUTHOR EMAIL</th>
            <th>AUTHOR ADRESS</th>
            <th>POST COMMENTS</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map(item => 
          <Post data={item} />)}
        </tbody>
      </table>);
      } else if (this.state.items.title.includes(this.state.filter) || this.state.items.body.includes(this.state.filter)){
        filteredPost.push(<table>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>POST BODY</th>
              <th>AUTHOR NAME</th>
              <th>AUTHOR EMAIL</th>
              <th>AUTHOR ADRESS</th>
              <th>POST COMMENTS</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map(item => 
            <Post data={item} />)}
          </tbody>
        </table>);
      }
      return (
        <div>
          <input className='postSearcher' type='text' onChange={this.filterChanged} placeholder='Search the post'></input>
        {filteredPost}
        </div>
        );
    } else {

    } return (
      <div> <button className='btn' onClick={this.getItem} disabled>Loading....</button></div>
    );
    console.log(this.state.items.title);
  }
}

export default PostList; 
