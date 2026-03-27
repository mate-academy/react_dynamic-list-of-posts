export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Posts {
  posts: Post[];
  userId: number;
  postId: number;
}

export interface PostsListProps {
  posts: Post[];
  showSideBar: (isOpen: boolean) => void;
  userId: number;
  onPostId: (id: number) => void;
  postId: number;
}
