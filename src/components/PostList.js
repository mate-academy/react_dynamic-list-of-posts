import React from 'react';
import Post from './Post';
import {getComments, getPosts, getUsers} from "./utils";

export default class PostList extends React.Component {
  state = {
    posts: [],
    requested: false,
    loaded: false,
  };

  loadData = () => {
    this.setState({
      requested: true,
    });

    Promise.all([getPosts(), getUsers(), getComments()])
      .then(([ posts, users, comments ]) => {
        this.setState({
          posts: posts.map(post => ({
            ...post,
            user: users.find(user => user.id === post.userId),
            comments: comments.filter(comment => comment.postId === post.id),
          })),
          loaded: true,
          requested: false,
        })
      })
  };

  render() {
    if(this.state.requested) {
      return <button>Loading...</button>
    }

    if(!this.state.loaded) {
      return <button onClick={this.loadData}>Load Posts</button>
    }

    return (
      <section>
        {this.state.posts.map(post => <Post key={post.id} {...post}/>)}
      </section>
    )
  }
};
