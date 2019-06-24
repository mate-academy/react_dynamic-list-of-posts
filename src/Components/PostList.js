import React from 'react';
import Post from './Post.js';

function PostList(props) {
  const postsList = [];
  for (let post of props.posts) {
    const currentUser = props.users.find(person => person.id === post.userId);
    const currentComments = props.comments.filter(comment => comment.postId === post.id);
    postsList.push(<Post post={post} key={post.id} user={currentUser} comments={currentComments} />);
  }
  return (
    <div>
      {postsList}
    </div>
  );
}

export default PostList;
