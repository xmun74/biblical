import { useState } from 'react';
import useIntersect from '@/hooks/useIntersect';

const VisibleItem = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);

  const target = useIntersect(
    async () => setVisible(true),
    () => setVisible(false),
    { threshold: 0.3 }
  );

  return (
    <section
      className={`mt-[200px] max-h-[1400px] min-h-fit flex justify-center items-center transition-all duration-700 
    ${visible ? 'opacity-100 -translate-y-4' : 'opacity-0'}`}
      ref={target}
    >
      {children}
    </section>
  );
};
export default VisibleItem;
