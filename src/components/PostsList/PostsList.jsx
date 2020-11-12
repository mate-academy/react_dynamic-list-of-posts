import React,{useEffect, useState} from 'react';
import './PostsList.scss';
import {usersPosts} from '../../api/post';

export const PostsList = ({userId}) => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    usersPosts()
      .then(post => {
        setPost(post)
      })
  },[]);

  return (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {
        posts.map(post => (
          <li className="PostsList__item">
            <div>
              <b>[User #{post.userId}]: </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
            >
              Open
            </button>
          </li>
        ))
      }
      {/* <li className="PostsList__item">
        <div>
          <b>[User #1]: </b>
          sunt aut facere repellat provident occaecati excepturi optio
        </div>
        <button
          type="button"
          className="PostsList__button button"
        >
          Close
        </button>
    </li>*/}
    </ul>
  </div>
  )
};
