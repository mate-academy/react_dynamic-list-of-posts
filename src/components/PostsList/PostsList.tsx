import React, { FC, useState, ChangeEvent } from 'react';
import { Post } from '../Post/Post';
import { FullPostType } from '../../utils/interfaces';
import './PostsList.css';

interface Props {
  posts: FullPostType[];
}

export const PostsList: FC<Props> = ({ posts }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const inputValueToLowerCase = inputValue.toLowerCase();
  const filteredPosts = posts.filter((post) => {
    const titleToLowerCase = post.title.toLowerCase();
    const bodyToLowerCase = post.body.toLowerCase();

    return (
      titleToLowerCase.includes(inputValueToLowerCase)
      || bodyToLowerCase.includes(inputValueToLowerCase)
    );
  });

  const visiblePosts = inputValue ? filteredPosts : posts;


  return (
    <>
      <label
        htmlFor="search"
        className="app__label"
      >
        {'Search post:  '}
        <input
          className="app__input"
          id="search"
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
      <p>{`Searched posts: ${visiblePosts.length}`}</p>
      <ul className="post-list">
        {visiblePosts.map(post => (
          <li key={post.id} className="post-list__item post">
            <Post post={post} />
          </li>
        ))}
      </ul>
    </>
  );
};
