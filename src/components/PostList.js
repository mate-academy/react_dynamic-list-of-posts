import React from 'react';
import Post from './Post';
import {COMMENTS_URL, POSTS_URL, USERS_URL, doFetch} from "./utils";

export default class PostList extends React.Component {
  state = {
    posts: [],
    requested: false,
    loaded: false,
  }

  loadData() {
    this.setState({
      requested: true,
    });

    Promise.all([doFetch(POSTS_URL), doFetch(USERS_URL), doFetch(COMMENTS_URL)])
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
  }

  render() {
    if(this.state.requested) {
      return <button>Loading...</button>
    }

    if(!this.state.loaded) {
      return <button onClick={() => this.loadData()}>Load Posts</button>
    }

    return (
      <section>
        {this.state.posts.map(post => <Post {...post}/>)}
      </section>
    )
  }
};
