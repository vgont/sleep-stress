import { sonoData } from "./../types/types";
import { AIFeatures, AITargets } from "../types/types";

export async function qualificarSleepStress(data: AIFeatures) {
  const apiUrl = "http://localhost:8080/qualificar";

  const queryString = Object.entries(data)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const urlWithParams = `${apiUrl}?${queryString}`;

  const response = await fetch(urlWithParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: AITargets = await response.json();
  console.log(result);
  return {
    nivel_estresse: estresse(result.nivel_estresse),
    qualidade_sono: qualidade_sono(result.qualidade_sono),
  };
}

const estresse = (nivel: number) => {
  if (nivel >= 8) return "alto";
  if (nivel >= 6) return "moderado";
  return "baixo";
};

const qualidade_sono = (qualidade: number) => {
  if (qualidade >= 8) return "boa";
  if (qualidade >= 6) return "normal";
  return "ruim";
};

export async function PostSono(sonoData: sonoData) {
  const apiUrl = "http://localhost:8080/sono";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sonoData),
  });
  return response.json();
}
