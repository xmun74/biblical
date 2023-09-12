type PostsType = {
  id: number;
};

type User = {
  id: number;
  email: string;
  nickname: string;
  password: string;
  Followings: User[];
  Followers: User[];
  img?: string | null;
  snsId?: string | null;
  Posts?: PostsType[];
};
