import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { CommentItem } from './CommentItem';

type Props = {
  comments: Comment[] | null;
  hasErrorGetComments: boolean;
  isLoadingComments: boolean;
  post: Post;
  setComments: () => void;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  hasErrorGetComments,
  isLoadingComments,
  post,
  setComments,
}) => {
  const [isOpenComment, setIsOpenComment] = useState(false);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{post.title}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {hasErrorGetComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {comments &&
            comments.length > 0 &&
            comments.map((comment: Comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                setComments={setComments}
              />
            ))}

          {!isOpenComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsOpenComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpenComment && (
          <NewCommentForm postId={post.id} setComments={setComments} />
        )}
      </div>
    </div>
  );
};
