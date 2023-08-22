import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ImgProps {
  src: null | string;
  userId: number;
  size: string;
  rounded?: string;
}
type ImgConfigTypes = {
  [key: string]: {
    [key: string]: string;
  };
};
const imgConfig: ImgConfigTypes = {
  size: {
    sm: 'w-[36px] h-[36px]',
    md: 'w-[50px] h-[50px]',
    lg: 'w-[75px] h-[75px]',
    xl: 'w-[125px] h-[125px]',
  },
  rounded: {
    md: 'rounded-md',
    lg: 'rounded-[42px]',
    full: 'rounded-full',
  },
};

/**
 * AvatarImg Component
 * @type {function(src, userId, size, rounded): HTMLImageElement}
 * @param {null|string} src - null | string
 * @param {number} userId - number
 * @param {string} size - sm, md, lg, xl
 * @param {string} rounded - md, lg, full
 * @returns HTMLImageElement
 */
const AvatarImg = ({ src, userId, size, rounded }: ImgProps) => {
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
      className={`border cursor-pointer object-cover
      ${imgConfig['size'][size]}
      ${imgConfig['rounded'][rounded]}
      `}
      onClick={() => navigate(`/users/${userId}`)}
    />
  );
};
export default AvatarImg;
