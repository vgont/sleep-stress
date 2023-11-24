"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { cliente } from "../types/types";
import { PostCliente } from "../api/apiUtils";

const CadastroForm: React.FC = () => {
  const router = useRouter();
  const [nome, setNome] = useState<string>();
  const [usuario, setUsuario] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [diaNasc, setDiaNasc] = useState<string>();
  const [mesNasc, setMesNasc] = useState<string>();
  const [anoNasc, setAnoNasc] = useState<string>();
  const [disableSubmitButton, setDisableSubmitButton] = useState<boolean>(true);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (Number(mesNasc) === 2 && Number(diaNasc) > 29) {
      setDiaNasc("29");
    }
    if (
      nome &&
      usuario &&
      senha &&
      (Number(diaNasc) && Number(mesNasc)) >= 1 &&
      Number(anoNasc) >= 1923
    )
      return setDisableSubmitButton(false);
    setDisableSubmitButton(true);
  }, [nome, usuario, senha, diaNasc, mesNasc, anoNasc]);

  const handleDiaNasc = (e: ChangeEvent<HTMLInputElement>) => {
    const dia = Number(e.target.value);
    if (dia <= 31) {
      if (dia < 10) setDiaNasc(`0${String(dia)}`);
      else setDiaNasc(String(dia));
    }
  };

  const handleMesNasc = (e: ChangeEvent<HTMLInputElement>) => {
    const mes = Number(e.target.value);
    if (mes <= 12) {
      if (mes < 10) setMesNasc(`0${String(mes)}`);
      else setMesNasc(String(mes));
    }
  };

  const handleAnoNasc = (e: ChangeEvent<HTMLInputElement>) => {
    const ano = Number(e.target.value);
    if (ano < currentYear) setAnoNasc(String(ano));
  };
  const handleCadastro = async () => {
    const clienteData: cliente = {
      altura_cliente: null,
      classificacao_bmi: null,
      data_nasc_cliente: `${diaNasc}/${mesNasc}/${anoNasc}`,
      nome_cliente: nome as string,
      peso_cliente: null,
      senha_cliente: senha as string,
      usuario_cliente: usuario as string,
    };

    await PostCliente(clienteData);
    router.push("/");
  };
  return (
    <div className="w-full max-w-xs mx-auto mt-20">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            {"Nome"}
          </label>
          <input
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNome(e.target.value)
            }
            value={nome}
            maxLength={50}
            placeholder="John Doe"
          />
        </div>
        <label className="block text-gray-700 text-sm font-bold mt-4">
          Data de nascimento
        </label>
        <div className="mb-4 flex w-full">
          <div className="m-1 flex flex-col">
            <input
              className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Dia"
              type="number"
              onChange={handleDiaNasc}
              value={diaNasc}
              placeholder="dd"
            />
          </div>
          <div className="m-1 flex flex-col">
            <input
              className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Mês"
              type="number"
              onChange={handleMesNasc}
              value={mesNasc}
              placeholder="mm"
            />
          </div>
          <div className="m-1 flex flex-col">
            <input
              className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Ano"
              type="number"
              onChange={handleAnoNasc}
              value={anoNasc}
              placeholder="yyyy"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            {"Usuário"}
          </label>
          <input
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            maxLength={20}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsuario(e.target.value)
            }
            value={usuario}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            {"Senha"}
          </label>
          <input
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*************"
            maxLength={20}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSenha(e.target.value)
            }
            value={senha}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className={`${
              disableSubmitButton
                ? "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="button"
            onClick={handleCadastro}
            disabled={disableSubmitButton}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroForm;
