interface PostsProps {
  id: number;
}
interface UserProps {
  id: number;
  email: string;
  nickname: string;
  password: string;
  Followings: User[];
  Followers: User[];
  img?: string | null;
  snsId?: string | null;
  Posts?: PostsProps[];
}
