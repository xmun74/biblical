import { useEffect, useState } from 'react';
import { DEFAULT_IMG_URL } from '@/constants';

type ImgProps = {
  src: null | string;
  size: string;
  rounded?: string;
  onClick?: () => void;
};

type ImgConfigType = Record<'size' | 'rounded', Record<string, string>>;

const imgConfig: ImgConfigType = {
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
 * @type {function(src, size, rounded, onClick): JSX.Element}
 * @param {null|string} src - null | string
 * @param {string} size - sm, md, lg, xl
 * @param {string} rounded - md, lg, full (Optional)
 * @param {function} onClick - Click handler (Optional)
 * @returns JSX.Element that represents an avatar image
 */
const AvatarImg = ({ src, size, rounded, onClick }: ImgProps): JSX.Element => {
  const [avatar, setAvatar] = useState(DEFAULT_IMG_URL);
  useEffect(() => {
    setAvatar(src ? `${process.env.API_URL}${src}` : DEFAULT_IMG_URL);
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
