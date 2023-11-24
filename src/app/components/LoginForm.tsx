"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GetClienteByUser, GetIdClienteByUser } from "../api/apiUtils";
import { useEffect, useState } from "react";
import useClienteStore from "../stores/useClienteStore";

const LoginForm: React.FC = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const { setIdCliente, setDataNasc } = useClienteStore();

  useEffect(() => {
    if (usuario && senha) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  }, [usuario, senha]);

  const router = useRouter();
  const handleLogin = async () => {
    if (usuario && senha) {
      const response = await GetClienteByUser({ usuario, senha });
      if (response) {
        const clienteData = await GetIdClienteByUser(usuario);
        if (clienteData) {
          setIdCliente(clienteData.id_cliente);
          setDataNasc(clienteData.data_nasc);
          router.push("/menu");
        }
      }
    }
  };
  return (
    <div className="w-full max-w-xs mx-auto mt-20">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsuario(e.target.value)}
            value={usuario}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`${
              isLoginDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="button"
            onClick={handleLogin}
            disabled={isLoginDisabled}
          >
            Logar
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/cadastro"
          >
            Cadastrar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
