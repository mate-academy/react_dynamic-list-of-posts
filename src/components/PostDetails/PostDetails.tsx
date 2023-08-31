import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './PostDetails.scss';
import { getPostComments } from '../../services/postService';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { CommentList } from '../CommentList';
import { usePosts } from '../../PostsContext';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    postComments,
    setPostComments,
  } = usePosts();

  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isCommentError, setIsCommentError] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);

  useEffect(() => {
    setIsWriting(false);
    if (selectedPost) {
      setIsCommentLoading(true);
      getPostComments(selectedPost.id)
        .then(newComments => setPostComments([...newComments]))
        .catch(() => setIsCommentError(true))
        .finally(() => setIsCommentLoading(false));
    }
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {isCommentLoading ? (
          <Loader />
        ) : (
          <>
            {isCommentError ? (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            ) : (
              <>
                <TransitionGroup component={null}>
                  {postComments.length ? (
                    <CSSTransition
                      classNames="comments"
                      timeout={300}
                      key="comments"
                    >
                      <CommentList setIsDeleteError={setIsDeleteError} />
                    </CSSTransition>
                  ) : (
                    <CSSTransition
                      classNames="no-comments"
                      timeout={300}
                      key="noComments"
                    >
                      <p className="title is-4" data-cy="NoCommentsMessage">
                        No comments yet
                      </p>
                    </CSSTransition>
                  )}
                </TransitionGroup>

                <TransitionGroup component={null}>
                  {isDeleteError && (
                    <CSSTransition classNames="fade" timeout={300}>
                      <div className="notification is-danger">
                        Couldn&apos;t delete a comment. Please, try again

                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <button
                          type="button"
                          className="delete"
                          onClick={() => setIsDeleteError(false)}
                        />
                      </div>
                    </CSSTransition>
                  )}
                </TransitionGroup>

                {isWriting ? (
                  <NewCommentForm />
                ) : (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setIsWriting(true)}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
