type CardProps = {
  label: string;
  imgSrc: string;
  content: string;
};

const Card = ({ label, imgSrc, content }: CardProps) => {
  return (
    <div className="min-w-[360px] min-h-[400px] bg-neutral-800 rounded-3xl mr-6">
      <div className="bg-gradient-to-t from-lime-300 to-cyan-500 w-full h-[250px] rounded-t-3xl flex justify-center items-center">
        <img src={imgSrc} alt="landing-card_img" className="w-[85%] h-[80%] rounded-md" />
      </div>

      <div className="p-6 min-h-[132]">
        <div className="font-monda text-white font-bold text-lg mb-2">{label}</div>
        <div className="font-monda text-white/60 font-thin">{content}</div>
      </div>
    </div>
  );
};
export default Card;
