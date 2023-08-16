import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  selectPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  selectPost,
}) => {
  const toggleSelectedPostFunction = (post: Post) => {
    if (post.id === selectedPost?.id) {
      selectPost(null);
    } else {
      selectPost(post);
    }
  };

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
          {
            posts.map(post => (
              <PostItem
                key={post.id}
                post={post}
                toggleSelectedPostFunction={toggleSelectedPostFunction}
                selectedPost={selectedPost}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
