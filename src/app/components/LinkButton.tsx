import { PropsWithChildren } from "react";

interface ILinkButton {
  dark?: boolean;
  onclick: () => void;
}

const LinkButton: React.FC<PropsWithChildren & ILinkButton> = ({
  children,
  dark,
  onclick,
}) => {
  return (
    <button
      className={`${
        dark ? "bg-blue-950 hover:bg-gray-900" : "bg-blue-700 hover:bg-blue-800"
      } text-white py-2 px-5 rounded font-semibold`}
      onClick={onclick}
    >
      {children}
    </button>
  );
};

export default LinkButton;
