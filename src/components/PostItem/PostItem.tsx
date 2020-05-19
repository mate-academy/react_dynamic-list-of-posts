import React from 'react';
import './PostItem.css';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';

type Props = {
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
};

const PostItem: React.FC<Props> = ({
  title, body, user, comments,
}) => (
  <section className="post">

    <h2 className="post__title">
      {title[0].toUpperCase() + title.slice(1)}
    </h2>

    <User {...user} />

    <article className="post__text">
      {body[0].toUpperCase() + body.slice(1)}
    </article>

    <CommentList comments={comments} />
  </section>

);

export default PostItem;
