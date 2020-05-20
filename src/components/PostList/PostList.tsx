import React from 'react';
import { Post, User, Comment } from '../../helpers/api';
import { PostCard } from '../PostCard/PostCard';

type Props = {
  posts: Post[];
  users: User[];
  comments: Comment[];
}

export const PostList: React.FC<Props> = ({ posts, users, comments }) => (
  <ul>
    {posts.map((post: Post) => {

      const user = users.find((user: User) => (
        user.id === post.userId));
      const commentsList = comments.filter((comment: Comment) => (
        comment.postId === post.id
        ));

      return (
        user && (
          <PostCard
          post={post}
          user={user}
          commentsList={commentsList}
          key={post.id} />
        )
      )}
    )}
  </ul>
);
