import React, { FC } from 'react';
import { UserItem } from '../UserItem/UserItem';
import { CommentList } from '../CommentsList/CommentsList';
import './PostItem.css';

interface Props {
  postItem: PrepearedPost;
}

export const PostItem: FC<Props> = ({ postItem }) => (
  <div className="post">
    <UserItem user={postItem.user} />

    <div className="post-body">
      <p className="post-title">{postItem.title}</p>
      <p className="post-desctiption">{postItem.body}</p>
    </div>

    <div className="post-comments">
      <CommentList comments={postItem.comments} />
    </div>
  </div>
);
