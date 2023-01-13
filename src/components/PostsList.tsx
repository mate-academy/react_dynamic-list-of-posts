import React, { useEffect } from 'react';

import { PostItem } from './PostItem';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | undefined;
  setSelectedPostId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const PostsList: React.FC<Props> = (props) => {
  const {
    posts,
    selectedPost,
    setSelectedPostId,
  } = props;

  useEffect(() => {
    setSelectedPostId(null);
  }, []);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <PostItem
              post={post}
              key={post.id}
              selectedPost={selectedPost}
              setSelectedPostId={setSelectedPostId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
