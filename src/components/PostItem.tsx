import React from 'react';
import { User } from './User';
import { CommentsList } from './CommentList';

type Props = {
  post: PostsFromServer;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const {
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <div>
      <h2>{title}</h2>
      <p>{body}</p>
      <section className="post__personalInfo">
        <User user={user} />
      </section>
      <section className="comments">
        <ul className="comment__list">
          {comments.map((comment: Comment) => (
            <li className="comment__item" key={comment.id}>
              <CommentsList comment={comment} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
