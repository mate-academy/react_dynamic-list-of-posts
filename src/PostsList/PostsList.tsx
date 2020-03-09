import React, { FC, useState, ChangeEvent } from 'react';
import { Post } from '../Post/Post';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import { PostWithUser } from '../types';

import './PostsList.css';

interface Props {
  posts: PostWithUser[];
}

export const PostsList: FC<Props> = ({ posts }) => {
  const [inputValue, setInputValue] = useState('');

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(inputValue.trim().toLowerCase())
      || post.body.toLowerCase().includes(inputValue.trim().toLowerCase())
    );
  });

  const postedList = inputValue ? filteredPosts : posts;

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={changeHandler}
        placeholder="Find a post"
      />
      {postedList.map(post => (
        <ul className="card" key={post.id}>
          <Post post={post} />
          <User
            user={post.user}
          />
          <hr />
          <p className="card__comments">Comments</p>
          <CommentList comments={post.comments} />
        </ul>
      ))}
    </>
  );
};
