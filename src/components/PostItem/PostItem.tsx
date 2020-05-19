import React from 'react';
import './PostItem.css';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import { capitalize } from '../../helpers/capitalize';

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
      {capitalize(title)}
    </h2>

    <User {...user} />

    <article className="post__text">
      {capitalize(body)}
    </article>

    <CommentList comments={comments} />
  </section>

);

export default PostItem;
