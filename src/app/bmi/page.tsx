"use client";
import LogoHT from "../components/LogoHT";
import BMIForm from "../components/BMIForm";
import NavBar from "../components/NavBar";

export default function Bmi() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <LogoHT />
      <NavBar atualPage="bmi" />
      <BMIForm />
    </main>
  );
}
