import React, {FC} from 'react';
import { Post } from './Post';
import './PostList.css';
import { PreparedPosts } from '../interfaces';

interface Props {
  preparedPosts: PreparedPosts[];
}

export const PostList: FC<Props> = ({ preparedPosts }) => (
  <>
    {preparedPosts.map(post => (

      <div className="post" key={post.id}>
        <Post {...post} />
      </div>

    ))}
  </>
);
