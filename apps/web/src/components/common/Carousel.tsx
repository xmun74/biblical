import { Children, useEffect, useState } from 'react';
import Back from '@/assets/svg/Back.svg';

const Carousel = ({ children }: { children: React.ReactElement[] }) => {
  const [current, setCurrent] = useState(0);

  const childrenArray = Children.toArray(children) as React.ReactElement[];

  const nextSlide = () => {
    setCurrent((current + 1) % childrenArray.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + childrenArray.length) % childrenArray.length);
  };

  useEffect(() => {}, [childrenArray, current]);

  return (
    <section
      aria-roledescription="carousel"
      className={`relative w-full overflow-hidden flex justify-start items-start`}
    >
      <ul
        className={`flex justify-start items-start transition-transform duration-500 ease-in-out no-scrollbar
        `}
        style={{ transform: `translateX(-${current * (100 / childrenArray.length)}%)` }}
      >
        {childrenArray?.map((child, i) => (
          <li key={i} className="w-full mr-6">
            {child}
          </li>
        ))}
      </ul>
      <fieldset
        aria-label="Carousel pagination controls"
        className="absolute flex justify-between items-center inset-0"
      >
        <button className="bg-slate-400 hover:opacity-70 p-3 rounded-full" onClick={prevSlide}>
          <Back fill="white" width="18px" height="18px" />
        </button>
        <button className="bg-slate-400 hover:opacity-70 p-3 rounded-full rotate-180" onClick={nextSlide}>
          <Back fill="white" width="18px" height="18px" />
        </button>
      </fieldset>
    </section>
  );
};

export default Carousel;
