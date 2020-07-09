/* eslint-disable no-console */
import React from 'react';
import { uuid } from 'uuidv4';
import { postType } from './interfaces';
import { Comment } from './Comment';

export const Post: React.FC<postType> = ({ post }) => {
  return (
    <li key={uuid()} className="post shadow-lg p-3 mb-5 bg-white font-italic">
      <h4 className="post__title">{post.title}</h4>
      <p>{post.body}</p>
      <div className="wrapper">
        <div className="box-l">
          <p className="post__title">
            Post by
            &nbsp;
            {post.author}
          </p>
        </div>
        <div className="box-r">
          <a className="mail" href="mailto:1111@mail.ru">
            Email:
            &nbsp;
            {post.email}
          </a>
          <p>
            Address
            &nbsp;
            {post.address}
          </p>
        </div>
      </div>
      <ul>
        {
          post.comments.map(comment => <Comment key={uuid()} comment={comment} />)
        }
      </ul>
    </li>
  );
};
