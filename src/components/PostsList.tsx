import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';
import { Comment } from '../types/Comment';

interface Props {
  posts: Post[];
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  loadComments: (postId: number) => void;
  selectedPost: Post | null;
  setComments: (comments: Comment[]) => void;
  setIsOpenComment: (value: boolean) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  setSelectedPost,
  loadComments,
  selectedPost,
  setComments,
  setIsOpenComment,
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
        {posts.map(post => (
          <PostItem
            post={post}
            setSelectedPost={setSelectedPost}
            loadComments={loadComments}
            selectedPost={selectedPost}
            setComments={setComments}
            setIsOpenComment={setIsOpenComment}
            key={post.id}
          />
        ))}
      </tbody>
    </table>
  </div>
);
