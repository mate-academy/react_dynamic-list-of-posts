import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
  onSelectPost: (post: Post | null) => void;
  selectedPost: Post | null;
  setDisplayNewCommentForm: (value: boolean) => void;
  setDisplayCommentButton: (value: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelectPost,
  selectedPost,
  setDisplayNewCommentForm,
  setDisplayCommentButton,
}) => {
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
              onSelectPost={onSelectPost}
              selectedPost={selectedPost}
              setDisplayNewCommentForm={setDisplayNewCommentForm}
              setDisplayCommentButton={setDisplayCommentButton}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
