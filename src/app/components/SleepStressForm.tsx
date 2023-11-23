import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { qualificarSleepStress } from "../api/apiUtils";
import { sonoData } from "../types/types";

interface ISleepStressForm {
  setSonoData: (data: sonoData) => void;
}

const SleepStressForm: React.FC<ISleepStressForm> = ({ setSonoData }) => {
  const currentDate = new Date();

  const [disableSubmitButton, setDisableSubmitButton] = useState<boolean>(true);
  const [horasDormidas, setHorasDormidas] = useState<string>("");
  const [tempoAtvFisica, setTempoAtvFisica] = useState<string>("");
  const [diaSono, setDiaSono] = useState<string>(
    String(currentDate.getDate() - 1)
  );
  const [mesSono, setMesSono] = useState<string>(
    String(currentDate.getMonth() + 1)
  );

  useEffect(() => {
    if (Number(mesSono) === 2 && Number(diaSono) > 28) {
      setDiaSono("28");
    }
    if (
      horasDormidas &&
      tempoAtvFisica &&
      (horasDormidas && tempoAtvFisica) !== "" &&
      (Number(diaSono) && Number(mesSono)) >= 1
    )
      return setDisableSubmitButton(false);
    setDisableSubmitButton(true);
  }, [horasDormidas, tempoAtvFisica, diaSono, mesSono]);

  const handleHorasDormidas = (e: ChangeEvent<HTMLInputElement>) => {
    const horas = e.target.value;
    if (Number(horas) <= 12) setHorasDormidas(horas);
  };

  const handleTempoAtvFisica = (e: ChangeEvent<HTMLInputElement>) => {
    const tempo = e.target.value;
    if (Number(tempo) <= 360) setTempoAtvFisica(tempo);
  };

  const handleDiaSono = (e: ChangeEvent<HTMLInputElement>) => {
    const dia = Number(e.target.value);
    if (dia <= 31) {
      if (dia < 10) setDiaSono(`0${String(dia)}`);
      else setDiaSono(String(dia));
    }
  };

  const handleMesSono = (e: ChangeEvent<HTMLInputElement>) => {
    const mes = Number(e.target.value);
    if (mes <= 12) {
      if (mes < 10) setMesSono(`0${String(mes)}`);
      else setMesSono(String(mes));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { nivel_estresse, qualidade_sono } = await qualificarSleepStress({
      idade: 18,
      duracao_sono: Number(horasDormidas),
      tempo_atividade_fisica: Number(tempoAtvFisica),
    });
    const sonoData: sonoData = {
      id_cliente: 1,
      data_sono: `${diaSono}/${mesSono}/${currentDate.getFullYear()}`,
      duracao_sono: Number(horasDormidas),
      nivel_estresse: nivel_estresse,
      qualidade_sono: qualidade_sono,
      tempo_atividade_fisica: Number(tempoAtvFisica),
    };
    setSonoData(sonoData);
  };

  return (
    <form className="w-full max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="horasDormidas"
          >
            {"Horas dormidas na noite"}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="horasDormidas"
            type="text"
            placeholder="até 12h"
            onChange={handleHorasDormidas}
            value={String(horasDormidas)}
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="tempoAtvFisica"
          >
            {"TEMPO (EM MINUTOS) DE ATV FÍSICA"}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="tempoAtvFisica"
            type="text"
            placeholder="até 360min"
            onChange={handleTempoAtvFisica}
            value={String(tempoAtvFisica)}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-3 text-white justify-center font-bold">
        {"DATA DO SONO"}
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="dia"
          >
            {"DIA"}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="dia"
            type="text"
            placeholder="01"
            onChange={handleDiaSono}
            value={diaSono}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="mes"
          >
            {"MÊS"}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="mes"
            type="text"
            placeholder="01"
            onChange={handleMesSono}
            value={mesSono}
          />
        </div>

        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="ano"
          >
            {"ANO"}
          </label>
          <span
            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="ano"
          >
            {currentDate.getFullYear()}
          </span>
        </div>
        <button
          className={`shadow ${
            disableSubmitButton
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          } focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-10 mx-auto`}
          type="submit"
          disabled={disableSubmitButton}
        >
          {"Qualificar"}
        </button>
      </div>
    </form>
  );
};

export default SleepStressForm;
