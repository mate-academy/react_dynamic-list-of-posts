import React from 'react';
import User from './User';
import './Postlist.css';
import CommentsList from './CommentsList';

const PostList = ({ loadedPosts }) => (

  <div>
    {loadedPosts.map(post => (
      <div className="postlist_item" key={post.id}>
        <div className="postlist_title">{post.title} </div>
        <div className="postlist_body">{post.body} </div>
        <div><User userData={post.userData} /></div>
        <div><CommentsList commentData={post.userComments} /></div>
      </div>
    ))};
  </div>
);

export default PostList;
