import React from 'react';
import './PostList.css';
import ListOfComments from "./ListOfComments/ListOfComments";

type Props = {
  posts: Post[];
};

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <ul className="post__list">
      {posts.map(post => (
        <li key={post.id} className="post__item">
          <div className="post__title">
            Title: {post.title}
          </div>
          <p className="post__author">
            Author: {post.user ? post.user.name : ''}
          </p>
          <p className="post__body">
            {post.body}
          </p>
          <ListOfComments comments={post.comments ? post.comments : []}/>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
