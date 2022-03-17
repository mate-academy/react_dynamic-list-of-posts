import React, { useCallback, useEffect, useState } from 'react';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { NewCommentForm } from '../NewCommentForm';

import './PostDetails.scss';
import { Loader } from '../Loader';

type Props = {
  selectedPostId: number
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post>();
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isCommentsHidden, setIsCommentsHidden] = useState(true);
  const [loading, setIsLoading] = useState(false);

  const fetchPostComments = useCallback(async () => {
    setPostComments(await getPostComments(selectedPostId));
  }, [selectedPostId]);

  const updateComments = () => {
    fetchPostComments();
  };

  const fetchPostDetails = useCallback(async () => {
    setPost(await getPostDetails(selectedPostId));
    updateComments();
    setIsLoading(false);
  }, [selectedPostId]);

  useEffect(() => {
    setIsLoading(true);
    fetchPostDetails();
  }, [selectedPostId]);

  const onCommentDelete = async (id: number) => {
    setIsLoading(true);
    await deleteComment(id);
    await setIsLoading(false);
    updateComments();
  };

  const onCommentAdd = useCallback(async (name: string, email: string, body: string) => {
    await addComment(selectedPostId, name, email, body);
    updateComments();
  }, [selectedPostId]);

  return loading ? (
    <Loader />
  ) : (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments.length > 0 && (
          <>
            <button
              type="button"
              className="button"
              onClick={() => setIsCommentsHidden(!isCommentsHidden)}
            >
              {`${isCommentsHidden ? 'Show' : 'Hide'} ${postComments.length} comments`}
            </button>

            {!isCommentsHidden && (
              <ul className="PostDetails__list">
                {postComments.map(postComment => (
                  <li key={postComment.id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => onCommentDelete(postComment.id)}
                    >
                      X
                    </button>
                    <p>{postComment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm onCommentAdd={onCommentAdd} />
        </div>
      </section>
    </div>
  );
};
