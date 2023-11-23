"use client";
import LoginForm from "./components/LoginForm";
import LogoHT from "./components/LogoHT";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <LogoHT />
      <LoginForm />
    </main>
  );
}
