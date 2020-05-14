
import React from 'react';
import { Post } from './Post';
import { ListOfPostsPropsType, CustomisedPostType } from './interfaces';


export const ListOfPosts: React.FC<ListOfPostsPropsType> = (props) => {
  return (
    <ul>
      {
        props.posts.map((post: CustomisedPostType) => (
          <li key={post.id}>
            <Post
              post={post}
            />
          </li>
        ))
      }
    </ul>
  );
};
