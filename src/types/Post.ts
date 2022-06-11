export interface Post {
  id: number;
  userId: number;
  title: string;
}

export interface DetailsPost {
  id: number;
  body: string;
}

export interface ComentsPost {
  id: number;
  body: string;
}

export interface NewPostBody {
  postId?: number;
  name: string;
  email: string;
  body: string;
}
