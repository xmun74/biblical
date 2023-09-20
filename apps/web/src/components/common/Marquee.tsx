type MarqueeProps = {
  children: React.ReactNode;
  width: string;
  className?: string;
};

const Marquee = ({ children, width, className, ...other }: MarqueeProps) => (
  <div className={`h-5 w-[${width}] overflow-hidden relative`}>
    <p className={`whitespace-nowrap animate-marquee absolute ${className}`} {...other}>
      {children} {children}
    </p>
  </div>
);

export default Marquee;
