import React from 'react';

import { PostCard } from './PostCard';
import { User } from './User';
import { CommentList } from './CommentList';
import { IPost, IUser, IComment } from '../helpers/interfaces';

type Props = {
  posts: IPost[];
  users: IUser[];
  comments: IComment[];
};

export const PostList: React.FC<Props> = ({ posts, users, comments }) => {
  const unUser: IUser = {
    address: {
      city: '',
      street: '',
      zipcode: '',
      suite: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    email: '',
    id: -1,
    name: '',
    username: '',
  };

  return (
    <ul className="post__list">
      {posts.map(post => {
        const ImpruvedUser: IUser | undefined = users.find(user => user.id === post.userId);

        return (
          <li key={post.id} className="post__card">
            <div>
              <PostCard post={post} />
              <User user={ImpruvedUser === undefined ? unUser : ImpruvedUser} />
              <CommentList
                comments={comments.filter(comment => comment.postId === post.id)}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
