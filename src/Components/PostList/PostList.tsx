import React from 'react';

import { Post } from '../Post/Post';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';

interface Props {
  posts: PostType[];
  users: UserType[];
  comments: CommentType[];
}

export const PostList: React.FC<Props> = ({ posts, users, comments }) => {
  const noUser: UserType = {
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

  let TempUser: UserType | undefined;

  return (
    <ul className="post__list">
      {posts.map(post => {
        TempUser = users.find(user => user.id === post.userId);

        return (
          <li key={post.id} className="post__item">
            <div>
              <Post post={post} />
              <User user={TempUser === undefined ? noUser : TempUser} />
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
