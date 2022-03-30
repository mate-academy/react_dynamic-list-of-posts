import React, { useEffect, useState } from 'react';

import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';

import { getPostComments, removeComment, addComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';

import './PostDetails.scss';

type Props = {
  postId: number,

};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isHidden, setIsHidden] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchPostComments = async () => {
    const recievedComments = await getPostComments(postId);

    setComments(recievedComments);
  };

  const fetchPostDetails = async () => {
    const recievedPost = await getPostDetails(postId);

    setIsLoaded(true);
    setPost(recievedPost);
  };

  useEffect(() => {
    if (postId) {
      fetchPostDetails();
      fetchPostComments();
    }
  }, [postId]);

  const onRemoveComment = async (commentId: number) => {
    await removeComment(commentId);
    fetchPostComments();
  };

  const onAddComment = async (name: string, email: string, body: string) => {
    await addComment(postId, name, email, body);
    fetchPostComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {isLoaded ? (
        <>
          <section className="PostDetails__post">
            <p>{post?.body}</p>
          </section>

          <section className="PostDetails__comments">
            {comments.length !== 0 && (
              <>
                <button
                  type="button"
                  className="button"
                  onClick={() => setIsHidden(!isHidden)}
                >
                  {`${isHidden ? 'Show' : 'Hide'} ${comments.length} comments`}
                </button>

                {!isHidden && (
                  <ul className="PostDetails__list">
                    {comments.map((comment) => (
                      <li
                        className="PostDetails__list-item"
                        key={comment.id}
                      >
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => onRemoveComment(comment.id)}
                        >
                          X
                        </button>
                        <p>{comment.body}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                onSubmitAddComment={onAddComment}
              />
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
