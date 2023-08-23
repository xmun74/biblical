interface PostFormProps {
  title: string;
  content: string;
  img?: string;
  tags?: string[];
}
interface PostProps extends PostFormProps {
  id: number;
}
