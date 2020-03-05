import React, { FC } from 'react';
import { User } from '../User';
import { Post} from '../Post';
import { CommentList } from '../CommentList';

interface Props {
  posts: PostWithUserAndComment[];
}

export const PostList: FC<Props> = (props) => {
  const { posts } = props;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="box">
          <User user={post.user} />
          <Post post={post} />
          <CommentList comments={post.comments} />
        </div>
      ))}
    </div>
  );
};
