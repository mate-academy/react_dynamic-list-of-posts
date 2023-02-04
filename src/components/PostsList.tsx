import React, { Dispatch, SetStateAction } from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: Dispatch<SetStateAction<Post | null>>;
  setAddError: Dispatch<SetStateAction<boolean>>;
  setDeleteError: Dispatch<SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
  setAddError,
  setDeleteError,
}) => {
  const handlePostSelect = (post: Post) => {
    setAddError(false);
    setDeleteError(false);

    if (post.id === selectedPost?.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
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
          {posts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              selectedPostId={!selectedPost ? 0 : selectedPost.id}
              handlePostSelect={handlePostSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
