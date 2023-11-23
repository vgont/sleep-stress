import { PropsWithChildren } from "react";

const Title: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="text-white text-3xl font-mono font-semibold">{children}</h1>
  );
};

export default Title;
