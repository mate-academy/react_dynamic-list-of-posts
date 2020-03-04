import React, { FC } from 'react';
import { PostItem } from '../PostItem/PostItem';

interface Props {
  postList: PrepearedUser[];
}

export const PostsList: FC<Props> = ({ postList }) => {
  // console.log(postList);

  return (
    <>
      {
        postList.map(post => (
          <PostItem postItem={post} key={post.id} />
        ))
      }
    </>
  );
}
