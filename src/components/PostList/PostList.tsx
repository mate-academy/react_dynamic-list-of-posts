import React, { FC } from 'react';
import { PreparedPost } from '../../utils/interfaces';
import { Post } from '../Post/Post';
import './PostList.css';

interface Props {
  postlist: PreparedPost[];
}

export const PostList: FC<Props> = ({ postlist }) => (
  <div className="postlist">
    {postlist.map(postItem => (
      <Post key={postItem.id} post={postItem} />
    ))}
  </div>
);
