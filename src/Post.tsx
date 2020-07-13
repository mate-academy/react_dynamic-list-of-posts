/* eslint-disable no-console */
import React from 'react';
import { preparedPostsType } from './interfaces';
import { Comment } from './Comment';

type Props = {
  post: preparedPostsType;
};

export const Post: React.FC<Props> = ({ post }) => (
  <li className="post shadow-lg p-3 mb-5 bg-white font-italic">
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
        post.comments.map(comment => <Comment key={comment.id} comment={comment} />)
      }
    </ul>
  </li>
);
