import React, { FC } from 'react';

export const CommentList: FC<Comments> = ({ comments }) => (
  <>
    {comments.map(({
      id, name, body, email,
    }) => (
      <section className="post__comment" key={id}>
        <p className="comment__name">{name}</p>
        <p className="comment__body">{body}</p>
        <a href={`mailto:${email}`} className="comment__email">
          {email}
        </a>
      </section>
    ))}
  </>
);
