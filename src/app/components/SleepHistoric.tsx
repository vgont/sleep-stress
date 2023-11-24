import { deleteSonoById } from "../api/apiUtils";
import { infoCliente } from "../types/types";
import { FaTrashAlt } from "react-icons/fa";

const SleepHistoric: React.FC<{
  infoCliente: infoCliente[];
  setInfoCliente: (infos: infoCliente[]) => void;
}> = ({ infoCliente, setInfoCliente }) => {
  const handleDeleteSono = async (id_sono: number) => {
    await deleteSonoById(id_sono);
    const find = infoCliente.filter((info) => info.id_sono !== id_sono);
    console.log(find);
    setInfoCliente(find);
  };

  return (
    <div
      className="hidiven p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 m-10 "
      id="stats"
      role="tabpanel"
      aria-labelledby="stats-tab"
    >
      {" "}
      <div className="flex text-white justify-between gap-12 mb-8">
        <div className="flex items-center justify-center">{"Data do sono"}</div>
        <div className="w-1/4 h-1/4 flex items-center justify-center">
          {"Atv física (em min)"}
        </div>
        <div className="w-1/4 h-1/4 flex items-center justify-center">
          {"Horas dormidas"}
        </div>
        <div className="w-1/4 h-1/4 flex items-center justify-center">
          {"Qualidade do sono"}
        </div>
        <div className="w-1/4 h-1/4 flex items-center justify-center">
          {"Nível de estresse"}
        </div>
      </div>
      {infoCliente.map((item: infoCliente) => (
        <div className="flex mb-4" key={item.id_sono}>
          <div className="flex text-white gap-24 border border-t-0 rounded w-full">
            <div className="w-1/4 flex justify-center items-center">
              {item.data_sono}
            </div>
            <div className="w-1/4 flex justify-center items-center">
              {item.tempo_atividade_fisica}min
            </div>
            <div className="w-1/4 flex justify-center items-center">
              {item.duracao_sono}h
            </div>
            <div className="w-1/4 flex justify-center items-center">
              {item.qualidade_sono}
            </div>
            <div className="w-1/4 flex justify-center items-center">
              {item.nivel_estresse}
            </div>
          </div>
          <button
            className="text-white ml-5"
            onClick={() => handleDeleteSono(item.id_sono)}
          >
            {FaTrashAlt()}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SleepHistoric;
