import React, { useState } from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
  onOpen: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({ posts, onOpen }) => {
  const [openedPost, setOpendPost] = useState<Post | null>(null);

  const handleClick = (post: Post) => {
    if (post.id === openedPost?.id) {
      setOpendPost(null);
      onOpen(null);
    } else {
      setOpendPost(post);
      onOpen(post);
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
            {}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          <PostItem
            posts={posts}
            openPostId={openedPost?.id}
            onClick={handleClick}
          />
        </tbody>
      </table>
    </div>
  );
};
