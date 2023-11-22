import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';
import { Comment } from '../types/Comment';
import { LoadingItems } from '../types/LoadingItems';
import { HasErrorItem } from '../types/ErrorMessage';

type Props = {
  posts: Post[] | null;
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
  setIsLoading: React.Dispatch<React.SetStateAction<LoadingItems>>,
  setHasError: React.Dispatch<React.SetStateAction<HasErrorItem>>,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
  setComments,
  setIsLoading,
  setHasError,
}) => (
  <div data-cy="PostsList">
    <p className="title">Posts:</p>

    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr className="has-background-link-light">
          <th>#</th>
          <th>Title</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {posts?.map(post => (
          <PostItem
            key={post.id}
            post={post}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
            setComments={setComments}
            setIsLoading={setIsLoading}
            setHasError={setHasError}
          />
        ))}
      </tbody>
    </table>
  </div>
);
