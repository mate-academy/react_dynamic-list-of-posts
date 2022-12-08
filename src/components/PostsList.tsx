import React, { useEffect, useRef } from 'react';
import { Post } from '../types/Post';
import { PostContent } from './PostContent';

type Props = {
  posts: Post[],
  selectedPost: Post | null,
  setSelectedPost: (arg: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
}) => {
  const prevPost = useRef<Post | null>(null);

  useEffect(() => {
    prevPost.current = selectedPost;
  }, [selectedPost]);

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
          {posts.map(post => {
            return (
              <PostContent
                key={post.id}
                post={post}
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
                prevPost={prevPost}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
