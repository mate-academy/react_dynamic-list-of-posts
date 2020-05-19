import React from 'react';

type Props = {
  posts: Post[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id} className="bg-dark text-light">
          <div>
            <p>
              Author:
              {post.author?.name}
            </p>
            <p>
              Email:
              <em>{post.author?.email}</em>
            </p>
          </div>
          <div>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
          <div className="bg-light text-dark">
            <h3>Comments: </h3>
            {post.comments?.map(comment => (
              <div key={comment.id}>
                <p>
                  User:
                  {comment?.name}
                </p>
                <p>
                  Email:
                  {comment?.email}
                </p>
                <p>{comment?.body}</p>
                <hr />
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};
