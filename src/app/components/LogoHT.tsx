import Image from "next/image";

const LogoHT: React.FC = () => {
  return (
    <h1 className="text-white text-4xl font-bold flex justify-center items-center font-mono">
      <Image alt="heart rate" src={"/logo.png"} width={60} height={10} />
      HealThinking
    </h1>
  );
};

export default LogoHT;
