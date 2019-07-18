import React from 'react';

const Post = ({ postData }) => (
  <div>
    <div className="postlist_title">{postData.title} </div>
    <div className="postlist_body">{postData.body} </div>
  </div>
);

export default Post;
