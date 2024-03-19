export type Error =
  | 'Posts'
  | 'Comments'
  | 'Add comment'
  | 'Delete comment'
  | null;

export type Loading = 'Posts' | 'Comments' | 'Form' | null;

export interface CommentInfo {
  name: string;
  email: string;
  body: string;
}

export interface CommentInfoError {
  name: boolean;
  email: boolean;
  body: boolean;
}
