import Link from "next/link";

import CadastroForm from "../components/CadastroForm";
import LoginForm from "../components/LoginForm";
import LogoHT from "../components/LogoHT";

export default function Cadastro() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <LogoHT />
      <Link
        href={"/"}
        className="text-white border-b-2 hover:text-gray-500 hover:border-gray-500"
      >
        Inicio
      </Link>
      <CadastroForm />
    </main>
  );
}
