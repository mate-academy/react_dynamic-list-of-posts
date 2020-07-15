import React from 'react';
import { Post } from './interfaces';
import { CommentItem } from './Comment';

interface Props {
  post: Post;
}

export const PostItem: React.FC<Props> = ({ post }) => (
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
        post.comments.map(comment => <CommentItem key={comment.id} comment={comment} />)
      }
    </ul>
  </li>
);
