import { cliente, login, sonoData } from "./../types/types";
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

export async function PostCliente(clienteData: cliente) {
  const apiUrl = "http://localhost:8080/cadastro";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clienteData),
  });
  return response.json();
}

export async function GetClienteByUser(data: login) {
  const apiUrl = "http://localhost:8080/validar";
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
  if (response.ok) {
    const result: { success: boolean } = await response.json();
    return result.success;
  }
  return { success: false, message: "An error occurred" };
}

export async function GetIdClienteByUser(user: string) {
  const apiUrl = `http://localhost:8080/user/${user}`;

  const response = await fetch(apiUrl);

  if (response.ok) {
    const result: { id_cliente: number; data_nasc: string } =
      await response.json();
    console.log(result);
    return result;
  } else {
    console.log("Erro ao pegar id do cliente");
  }
}

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
