import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ImgProps {
  src: null | string;
  userId: number;
  width?: number;
  height?: number;
}

const AvatarImg = ({ src, userId, width, height }: ImgProps) => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  useEffect(() => {
    if (!src) {
      setAvatar('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
    } else {
      setAvatar(`${process.env.API_URL}${src}`);
    }
  }, [src]);

  return (
    <img
      src={avatar}
      alt="user avatar image"
      width={width}
      height={height}
      className="border rounded-full cursor-pointer object-cover"
      onClick={() => navigate(`/users/${userId}`)}
    />
  );
};
export default AvatarImg;
