import Link from "next/link";
import { useState } from "react";

const NavBar: React.FC<{ atualPage: string }> = ({ atualPage }) => {
  const allPages = ["menu", "sleepStress", "bmi", "sonos"];
  const [pages] = useState(allPages.filter((page) => page !== atualPage));
  return (
    <div className="text-white flex flex-row justify-between mx-auto">
      {pages.map((page) => (
        <Link
          href={`/${page}`}
          className="hover:text-gray-500 hover:border-gray-500 border-b-2 mx-10 mb-16"
          key={page}
        >
          {page}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
