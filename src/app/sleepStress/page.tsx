"use client";
import LogoHT from "../components/LogoHT";
import Title from "../components/Title";
import SleepStressForm from "../components/SleepStressForm";
import { useState } from "react";
import { sonoData } from "../types/types";
import SleepStressResults from "../components/SleepStressResults";
import LinkButton from "../components/LinkButton";
import { PostSono } from "../api/apiUtils";
import { useRouter } from "next/navigation";

export default function SleepStress() {
  const router = useRouter();
  const [resultadoSono, setResultadoSono] = useState<sonoData | null>(null);

  const handleRegister = async () => {
    if (resultadoSono) {
      await PostSono(resultadoSono);
      router.push("/sonos");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-10 pr-10">
      <div className="self-end">
        <LogoHT />
      </div>
      <Title>{"SleepStress"}</Title>
      {!resultadoSono ? (
        <SleepStressForm setSonoData={setResultadoSono} />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <SleepStressResults sonoData={resultadoSono} />
          <LinkButton onclick={handleRegister}>Registrar</LinkButton>
        </div>
      )}
    </main>
  );
}
