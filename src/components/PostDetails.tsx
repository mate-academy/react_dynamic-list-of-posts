import { FC, useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { UserComments } from './UserComments';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface IProps {
  post: Post;
  comments: Comment[];
  errorMessage: string;
  loadingComments: boolean;
  creatLoadComments: boolean;
  deleteComment: (id: number) => void;
  creatComment: (userName: string, title: string, userEmail: string) => void;
}

export const PostDetails: FC<IProps> = ({
  post,
  errorMessage,
  comments,
  loadingComments,
  creatLoadComments,
  deleteComment,
  creatComment,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const shouldDisplay = !loadingComments && !errorMessage;

  useEffect(() => {
    setIsOpen(false);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loadingComments && <Loader />}

        {errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errorMessage}
          </div>
        )}

        {!comments.length && shouldDisplay && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length > 0 && shouldDisplay && (
          <>
            <p className="title is-4">Comments:</p>
            <UserComments comments={comments} deleteComment={deleteComment} />
          </>
        )}

        {!isOpen && shouldDisplay && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsOpen(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isOpen && (
        <NewCommentForm
          creatComment={creatComment}
          creatLoadComments={creatLoadComments}
        />
      )}
    </div>
  );
};
