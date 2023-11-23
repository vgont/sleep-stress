import CadastroForm from "../components/CadastroForm";
import LoginForm from "../components/LoginForm";
import LogoHT from "../components/LogoHT";

export default function Cadastro() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <LogoHT />
      <CadastroForm />
    </main>
  );
}
