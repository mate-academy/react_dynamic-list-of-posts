import React, {Component} from 'react';
import Post from "./Post";
import CommentList from "./CommentList";
import User from "./User";

class PostList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      loaded:false,
      requested: false,
      filter: ''
    };
    this.loadItems = this.loadItems.bind(this);
    this.filterChanged = this.filterChanged.bind(this);
  }
  
  loadApi(url) {
    return fetch(url)
      .then(res => res.json())
      .then(data => data);
  }


  loadItems() {

    this.setState({
      requested: true,
    });

    Promise.all([
      this.loadApi('https://jsonplaceholder.typicode.com/posts'),
      this.loadApi('https://jsonplaceholder.typicode.com/users'),
      this.loadApi('https://jsonplaceholder.typicode.com/comments')
    ])
      .then(([posts, users, comments]) => this.setState({
        data: posts.map(post => ({
          ...post,
          user: users.find(user => post.userId === user.id),
          comments:comments.filter(comment => post.id === comment.postId)
        })),
        loaded:true
      }))
  }

  filterChanged(event) {
    this.setState({
      filter: event.target.value,
    });
  }

  render() {
    if (!this.state.requested) {
      return <button className='load-btn' type='submit' onClick={this.loadItems}>Load page</button>;
    }

    if(this.state.loaded) {
      return (
        <div className='list'>
          <input type="text" placeholder="search" onChange={this.filterChanged} />
          {this.state.data.map(item =>
            item.title.includes(this.state.filter) || item.body.includes(this.state.filter) ?
            (<section>
              <Post
                key={item.title}
                title={item.title}
                text={item.body}
              />
              <User
                key={item.user.id}
                userName={item.user.name}
                email={item.user.email}
                address={item.user.address.street}
              />
              <CommentList comments={item.comments}/>
            </section>): null)}
        </div>
      )
    }else{
      return <div>Loading....</div>;
      }
  }
}

export default PostList;
