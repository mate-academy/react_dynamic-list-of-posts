import React from 'react';
import Post from './Post';
import User from './User';
import './Postlist.css';
import CommentsList from './CommentsList';

const PostList = ({ loadedPosts }) => (

  <div>
    {loadedPosts.map(post => (
      <div className="postlist_item" key={post.id}>
        <div><Post postData={post} /></div>
      </div>
    ))}
  </div>

);

export default PostList;
