import React, { Component } from 'react';
import Post from './Post.js';

class PostList extends Component {
  render() {
    const postsList = [];
    for (let post of this.props.posts) {
      const currentUser = this.props.users.find(person => person.id === post.userId);
      const currentComments = this.props.comments.filter(comment => comment.postId === post.id);
      postsList.push(<Post post={post} key={post.id} user={currentUser} comments={currentComments} />);
    }
    return (
      <div>
        {postsList}
      </div>
    );
  }
}

export default PostList;