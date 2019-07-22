import React from 'react';

import User from './User';
import CommentsList from './CommentsList';

const Post = ({ postData }) => (
  <div>
    <div className="postlist_title">{postData.title} </div>
    <div className="postlist_body">{postData.body} </div>
    <div><User userData={postData.userData} /></div>
    <div><CommentsList commentData={postData.userComments} /></div>
  </div>
);

export default Post;
