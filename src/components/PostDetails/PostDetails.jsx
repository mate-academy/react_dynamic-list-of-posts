import React from 'react';
import { NewCommentForm } from '../NewCommentForm';

export const PostDetails = () => (
  <div className="PostDetails">
    <h2>Post details:</h2>

    <section>
      <p>sunt aut facere repellat provident occaecati excepturi optio</p>
    </section>

    <section>
      <hr />

      <button type="button">Hide 2 comments</button>

      <ul>
        <li>
          <button type="button">X</button>
          My first comment
        </li>
        <li>
          <button type="button">X</button>
          sad sds dfsadf asdf asdf
        </li>
      </ul>
    </section>

    <section>
      <hr />

      <NewCommentForm />
    </section>
  </div>
);
