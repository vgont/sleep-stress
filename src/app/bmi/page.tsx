"use client";

import { useState } from "react";
import LogoHT from "../components/LogoHT";
import BMIForm from "../components/BMIForm";

export default function Bmi() {
  const [altura, setAltura] = useState<number>();
  const [peso, setPeso] = useState<number>();
  const [bmi, setBmi] = useState<string>();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <LogoHT />
      <BMIForm />
    </main>
  );
}
