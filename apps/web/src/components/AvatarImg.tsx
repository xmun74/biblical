import { useEffect, useState } from 'react';

interface ImgProps {
  src: null | string;
  size: string;
  rounded?: string;
  onClick?: () => void;
}
type ImgConfigTypes = {
  [key: string]: {
    [key: string]: string;
  };
};
const imgConfig: ImgConfigTypes = {
  size: {
    xs: 'w-[24px] h-[24px]',
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
 * @type {function(src, size, rounded, onClick): HTMLImageElement}
 * @param {null|string} src - null | string
 * @param {string} size - sm, md, lg, xl
 * @param {string} rounded - md, lg, full (optional)
 * @param {function} onClick - Click handler (optional)
 * @returns HTMLImageElement
 */
const AvatarImg = ({ src, size, rounded, onClick }: ImgProps) => {
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
      className={`cursor-pointer object-cover
      ${imgConfig['size'][size]}
      ${rounded && imgConfig['rounded'][rounded]}
      `}
      onClick={onClick}
    />
  );
};
export default AvatarImg;
