import { useContext, useState } from 'react';
import { Notif, Error, Loading } from '../../types';
import { Comments } from './components/Comments';
import { Loader, Notification } from '../index';
import { removeCommentOnServer } from '../../api';
import { NewCommentForm } from '../NewCommentForm';
import { PostDetailsContext } from '../../context';

export const PostDetails: React.FC = () => {
  const {
    post,
    error,
    loading,
    setComments,
    setError,
  } = useContext(PostDetailsContext);

  const [isForm, setIsForm] = useState(false);

  const removeComment = async (id: number) => {
    setComments((oldComments) => {
      return oldComments.filter(comment => comment.id !== id);
    });

    try {
      await removeCommentOnServer(id);
    } catch {
      setError(Error.RemoveComment);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post?.id}: ${post?.title}`}
        </h2>

        <p data-cy="PostBody">
          {post?.body}
        </p>
      </div>

      <div className="block">
        {loading === Loading.Comments ? (
          <Loader />
        ) : (
          <>
            {error === Error.GetComments ? (
              <Notification
                type={Notif.Danger}
                dataCy="CommentsError"
                text="Something went wrong"
              />
            ) : (
              <Comments
                isForm={isForm}
                setIsForm={setIsForm}
                removeComment={removeComment}
              />
            )}
          </>
        )}
      </div>

      {(isForm && post) && <NewCommentForm />}
    </div>
  );
};
