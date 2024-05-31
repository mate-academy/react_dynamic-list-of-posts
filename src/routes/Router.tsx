import { Route, Routes } from 'react-router-dom';
import { PostsList } from '../components/PostsList';
import React, { Dispatch, SetStateAction } from 'react';
import { Post } from '../types/Post';

type RouterProps = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: Dispatch<SetStateAction<Post | null>>;
  isDetailOpen: boolean;
  setIsDetailOpen: Dispatch<SetStateAction<boolean>>;
};

export const Router: React.FC<RouterProps> = ({
  posts,
  selectedPost,
  setSelectedPost,
  isDetailOpen,
  setIsDetailOpen,
}) => {
  return (
    <Routes>
      <Route
        path="/:#userId"
        element={
          <PostsList
            posts={posts}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
            isDetailOpen={isDetailOpen}
            setIsDetailOpen={setIsDetailOpen}
          />
        }
      ></Route>
    </Routes>
  );
};
