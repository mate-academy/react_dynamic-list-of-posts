import React from 'react';
import { Post } from './api';


type Props = {
  setQuery: (arg0: string) => void;
  query: string;
  sortedPosts: Post[];
};

export const PostList: React.FC<Props> = ({ setQuery, query, sortedPosts }) => {
  return (
    <>
      <input
        className="searchbar"
        type="text"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search"
        value={query}
      />
      <ul>
        {sortedPosts.map((newPost: Post) => (
          <li key={newPost.id} className="post">
            <div className="post__title">{newPost.title}</div>
            <div className="post__body">{newPost.body}</div>
            <div className="post__user-wrapper">
              <div className="post__user">
                <div className="post__user_name">
                  Name:
                  {' '}
                  {newPost.user ? newPost.user.name : 'guest user'}
                </div>
                <div className="post__user_email">
                  E-mail:
                  {' '}
                  {newPost.user ? newPost.user.email : 'no e-mail'}
                </div>
              </div>
              <div className="post__user_address">
                <div className="post__user_address-city">
                  City:
                  {' '}
                  {newPost.user ? newPost.user.address.city : '-'}
                </div>
                <div className="post__user_address-street">
                  Street:
                  {' '}
                  {newPost.user ? newPost.user.address.street : '-'}
                </div>
                <div className="post__user_address-zip">
                  Zip-code:
                  {' '}
                  {newPost.user ? newPost.user.address.zipcode : '-'}
                </div>
              </div>
            </div>
            {newPost.comments?.map(comment => (
              <div key={String(comment.id)} className="post__comment">
                <span className="post__comment_header">{comment.name}</span>
                <span className="post__comment_title">{comment.body}</span>
                <span className="post__comment_email">{comment.email}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
};
