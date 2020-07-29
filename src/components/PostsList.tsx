import React from 'react';
import { User, Comment, Post } from './Interfaces';
import { PostItem } from './PostItem';

interface Props {
  users: User[];
  comments: Comment[];
  posts: Post[];
}

export const PostsList: React.FC<Props> = ({ users, comments, posts }) => (
  <ul className="post-list">
    {
      posts.map((post: Post) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const userCopy = users.find((user: User) => user.id === post.userId)!;
        const filteredComments = comments.filter((comment: Comment) => comment.postId === post.id);

        return (
          <PostItem
            key={post.id}
            comments={filteredComments}
            user={userCopy}
            post={post}
          />
        );
      })
    }
  </ul>
);
