import React from 'react'
import Post from './Post'

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      request: false,
      posts: null,
      users: null,
      comments: null,
      filter: null
    }
    this.loadPosts = this.loadPosts.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
  }

  loadPosts() {
    this.setState({
      request: true
    })
  }

  filterPosts(e) {
    this.setState({
      filter: e.target.value
    })
  }

  componentDidMount() {
    const xhrPosts = new XMLHttpRequest();
    const xhrUsers = new XMLHttpRequest();
    const xhrComments = new XMLHttpRequest();

    xhrPosts.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhrUsers.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhrComments.open('GET', 'https://jsonplaceholder.typicode.com/comments');

    xhrPosts.addEventListener('load', () => {
      const parsedPosts = JSON.parse(xhrPosts.response);
      xhrUsers.addEventListener('load', () => {
        const parsedUsers = JSON.parse(xhrUsers.response);
        xhrComments.addEventListener('load', () => {
          const parsedComments = JSON.parse(xhrComments.response);
          this.setState({
            loaded: true,
            posts: parsedPosts,
            users: parsedUsers,
            comments: parsedComments
          })
        })
        xhrComments.send()
      })
      xhrUsers.send();
    })
    xhrPosts.send();
  }

  render () {
    if (!this.state.request){
      return (
        <div className="button-contaier">
          <button className="button" onClick={this.loadPosts}>Download</button>
        </div>
      );
    } else if (this.state.loaded) {
      if (this.state.filter === null) {
        return (
          <div className="posts-contaier">
            <div className="input-contaier">
              <input type="text" placeholder="Search" onChange={this.filterPosts}/>
            </div>
            {this.state.posts.map(post => (
              <Post
                users={this.state.users}
                post={post}
                comments={this.state.comments}
                key={post.id}
              />
           ))}
          </div>
        );
      } else if (this.state.filter !== null) {
        const filtredPost =  this.state.posts.filter(post => {
        return  post.title.includes(this.state.filter) || post.body.includes(this.state.filter)
        })
        return (
          <div className="posts-contaier">
            <div className="input-contaier">
              <input type="text" placeholder="Search" onChange={this.filterPosts}/>
            </div>
            {filtredPost.map(post => (
              <Post
                post={post}
                users={this.state.users}
                key={post.id}
                comments={this.state.comments}
              />
            ))}
          </div>
        );
      }
    } else {
      return <div>Loading...</div>
    }
  }
}

export default PostList;
