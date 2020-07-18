import React from 'react';
import { PostItem } from '../PostItem/PostItem';
import { CompletePost } from '../../interfaces';

interface Props {
  posts: CompletePost[];
}

export const Posts: React.FC<Props> = (props) => {
  const { posts } = props;

  return (
    <>
      {posts.map(post => (
        <div className="jumbotron" key={post.id}>
          <PostItem post={post} />
        </div>
      ))}
    </>
  );
};
