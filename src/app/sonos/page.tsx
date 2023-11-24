"use client";

import { useEffect, useState } from "react";
import SleepHistoric from "../components/SleepHistoric";
import LogoHT from "../components/LogoHT";
import { infoCliente } from "../types/types";
import { selectSonosByIdCliente } from "../api/apiUtils";
import useClienteStore from "../stores/useClienteStore";
import NavBar from "../components/NavBar";

export default function Sonos() {
  const [infoCliente, setInfoCliente] = useState<infoCliente[]>();
  const [loadingInfo, setLoadingInfo] = useState(true);
  const { idCliente } = useClienteStore();

  const handleSonos = async () => {
    const data: { sonos: infoCliente[] } = await selectSonosByIdCliente(
      idCliente
    );
    if (data.sonos.length > 0) setInfoCliente(data.sonos);
    setLoadingInfo(false);
  };

  useEffect(() => {
    handleSonos();
  }, [infoCliente]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-10 pr-10">
      <div>
        <LogoHT />
        <NavBar atualPage="sonos" />
        {loadingInfo ? (
          <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 m-10 text-white text-center">
            loading
          </div>
        ) : infoCliente && infoCliente?.length > 0 ? (
          <SleepHistoric
            infoCliente={infoCliente}
            setInfoCliente={setInfoCliente}
          />
        ) : (
          <div
            className="hidiven p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 m-10 text-white"
            id="stats"
            role="tabpanel"
            aria-labelledby="stats-tab"
          >
            {"Você não possui sonos cadastrados"}
          </div>
        )}
      </div>
    </main>
  );
}
