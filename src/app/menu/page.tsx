"use client";
import { useRouter } from "next/navigation";
import LinkButton from "../components/LinkButton";
import LogoHT from "../components/LogoHT";

export default function Menu() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <LogoHT />
      <div className="flex flex-col gap-5 mt-36">
        <LinkButton onclick={() => {}}>{"Visualizar Perfil"}</LinkButton>
        <LinkButton
          onclick={() => {
            router.push("/sleepStress");
          }}
        >
          {"SleepStress"}
        </LinkButton>
        <LinkButton
          onclick={() => {
            router.push("/bmi");
          }}
        >
          {"Calcular BMI"}
        </LinkButton>
        <LinkButton
          onclick={() => {
            router.push("/sonos");
          }}
        >
          {"Seus Sonos"}
        </LinkButton>
      </div>
    </main>
  );
}
