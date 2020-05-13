
import React from 'react';
import { Post } from './Post';
import { ListOfPostsPropsType, PostType } from './interfaces';


export const ListOfPosts: React.FC<ListOfPostsPropsType> = (props) => {
  return (
    <ul>
      {
        props.posts.map((post: PostType) => (
          <li key={post.id}>
            <Post
              user={props.users.filter(user => user.id === post.userId)}
              post={post}
              commentsList={props.comments.filter(comment => comment.postId === post.id)}
            />
          </li>
        ))
      }

    </ul>
  );
};
