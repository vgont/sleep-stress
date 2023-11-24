import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { CalcularBmi, putBmiCliente } from "../api/apiUtils";
import { useRouter } from "next/navigation";
import { cliente } from "../types/types";
import useClienteStore from "../stores/useClienteStore";

const BMIForm: React.FC = () => {
  const [altura, setAltura] = useState<number>();
  const [peso, setPeso] = useState<number>();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [bmi, setBmi] = useState<string>();

  const { idCliente } = useClienteStore();

  const router = useRouter();

  useEffect(() => {
    if (altura && peso && altura >= 60 && peso >= 25)
      setIsSubmitDisabled(false);
    else setIsSubmitDisabled(true);
  }, [altura, peso]);

  const handleAltura = (e: ChangeEvent<HTMLInputElement>) => {
    const alturaInput = Number(e.target.value);
    if (alturaInput <= 251) setAltura(alturaInput);
  };

  const handlePeso = (e: ChangeEvent<HTMLInputElement>) => {
    const pesoInput = Number(e.target.value);
    if (pesoInput <= 220) setPeso(pesoInput);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (altura && peso) {
      const bmi = await CalcularBmi(altura, peso);
      setBmi(bmi);
      setIsSubmitDisabled(true);
    }
  };

  const handleRegistrar = async () => {
    if (altura && peso && bmi) {
      const cliente = {
        altura_cliente: altura,
        classificacao_bmi: bmi,
        id_cliente: idCliente,
        peso_cliente: peso,
      };
      await putBmiCliente(cliente);
      router.push("/menu");
    }
  };
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="altura"
        >
          Sua Altura (cm)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="altura"
          type="number"
          placeholder="176"
          onChange={(e) => handleAltura(e)}
          value={altura}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="peso"
        >
          Seu Peso (kg)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="peso"
          type="number"
          placeholder="80.5"
          onChange={(e) => handlePeso(e)}
          value={peso}
        />
      </div>
      <button
        className={`${
          isSubmitDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        type="submit"
        disabled={isSubmitDisabled}
      >
        Calcular BMI
      </button>
      {!bmi ? null : (
        <div className="mt-10 font-semibold capitalize text-xl flex justify-between items-center">
          BMI: {bmi}{" "}
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="button"
            onClick={handleRegistrar}
          >
            Registrar
          </button>
        </div>
      )}
    </form>
  );
};

export default BMIForm;
