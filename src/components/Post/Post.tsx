import React, { FC } from 'react';
import { PostsWithUserAndComments } from '../../constants/types';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';

interface Props {
  post: PostsWithUserAndComments;
}

export const Post: FC<Props> = ({ post }) => {
  return (
    <div className="list__item">
      <div className="card">
        <h4 className="card-header">{post.title}</h4>
        <div className="card-body">

          <blockquote className="blockquote mb-0">
            <p>
              {post.body}
            </p>
            <footer className="blockquote-footer">
              <User user={post.user} />
            </footer>
          </blockquote>
          <CommentList comments={post.comments} />
        </div>
      </div>
    </div>
  );
};
