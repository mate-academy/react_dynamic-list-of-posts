import {
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentItem } from './CommentItem';
import { client } from '../utils/fetchClient';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';

type Props = {
  post: Post,
};

export const PostDetails: FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(Error.None);
  const [isForm, setIsForm] = useState(false);
  const { id, title, body } = post;

  useEffect(() => {
    setIsLoader(true);
    setIsForm(false);

    client.get<SetStateAction<Comment[]>>(`/comments?postId=${post.id}`)
      .then((result) => setComments(result))
      .catch(() => setError(Error.Load))
      .finally(() => setIsLoader(false));
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {isLoader && <Loader />}

          {!!error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length
            ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </>
            )}

          <button
            onClick={() => setIsForm(true)}
            data-cy="WriteCommentButton"
            type="button"
            className={cn(
              'button',
              'is-link',
              { 'is-hidden': isForm },
            )}
          >
            Write a comment
          </button>
        </div>

        {isForm && <NewCommentForm />}
      </div>
    </div>
  );
};
