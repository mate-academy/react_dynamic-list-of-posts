import React, { useCallback } from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
}) => {
  const postButtonClickHandler = useCallback((post: Post) => {
    setSelectedPost((prevSelectedPost) => {
      if (prevSelectedPost?.id === post.id) {
        return null;
      }

      return post;
    });
  }, [setSelectedPost]);

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
              selectedPost={selectedPost}
              postButtonClickHandler={postButtonClickHandler}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
