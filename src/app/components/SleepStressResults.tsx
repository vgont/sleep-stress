import { sonoData } from "../types/types";

interface ISleepStressResults {
  sonoData: sonoData;
}

const SleepStressResults: React.FC<ISleepStressResults> = ({ sonoData }) => {
  return (
    <div
      className="hidiven p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 m-10"
      id="stats"
      role="tabpanel"
      aria-labelledby="stats-tab"
    >
      <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 dark:text-white sm:p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2 text-3xl font-extrabold">
            {sonoData.duracao_sono}h
          </div>
          <div className="text-gray-500 dark:text-gray-400">Horas dormidas</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2 text-3xl font-extrabold">
            {sonoData.tempo_atividade_fisica}min
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            Atividade física
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2 text-3xl font-extrabold capitalize">
            {sonoData.nivel_estresse}
          </div>
          <div className="text-gray-500 dark:text-gray-400">Estresse</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2 text-3xl font-extrabold capitalize">
            {sonoData.qualidade_sono}
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            Qualidade do sono
          </div>
        </div>
        <div className="flex flex-col items-center justify-center col-span-2">
          <div className="mb-2 text-3xl font-extrabold">
            {sonoData.data_sono}
          </div>
          <div className="text-gray-500 dark:text-gray-400">Data do sono</div>
        </div>
      </dl>
    </div>
  );
};

export default SleepStressResults;
