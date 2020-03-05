import React, { FC } from 'react';
import './Post.css';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';

interface Props {
  post: CompletePostInterface;
}

export const Post: FC<Props> = ({ post }) => {
  const {
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <>
      <ul className="post">
        <li>
          <h3>
            {title}
          </h3>
        </li>
        <li>
          {body}
        </li>
        <li>
          <User user={user} />
        </li>
        <li className="comments">
          <p>Comments:</p>
          <CommentList key={post.id} comments={comments} />
        </li>
      </ul>
    </>
  );
};
