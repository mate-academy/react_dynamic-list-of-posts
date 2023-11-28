import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getUserCommentsByPostById } from '../utils/requestService';

type Props = {
  post: Post;
  selectedPost: number;
};

export const PostDetails: React.FC<Props> = ({ post, selectedPost }) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getUserCommentsByPostById(selectedPost)
      .then((data) => setPostComments(data))
      .finally(() => setIsLoading(false));
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoading
            && <Loader />}

          {/* <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div> */}

          {/* <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p> */}

          <p className="title is-4">Comments:</p>

          <article className="message is-small" data-cy="Comment">
            {postComments.map(com => {
              return (
                <>
                  <div className="message-header">
                    <a href={`mailto:${com.email}`} data-cy="CommentAuthor">
                      {com.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                    >
                      delete button
                    </button>
                  </div>
                  <div className="message-body" data-cy="CommentBody">
                    {com.body}
                  </div>
                </>
              );
            })}
          </article>
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
          >
            Write a comment
          </button>
        </div>

        <NewCommentForm />
      </div>
    </div>
  );
};
