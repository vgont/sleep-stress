import { AIFeatures, AITargets } from "../types/types";
import { cliente, login, sonoData } from "./../types/types";

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

export async function CalcularBmi(altura: number, peso: number) {
  const url = `https://bmi-calculator6.p.rapidapi.com/bmi?height=${altura}&weight=${peso}&system=metric`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2d7ba7c7eemshe31d159b6783f94p182215jsn02bd4da8e2ad",
      "X-RapidAPI-Host": "bmi-calculator6.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result: { Class: string } = await response.json();
    const bmi = result.Class;

    if (bmi === "Underweight") return "abaixo do peso";
    if (bmi === "Overweight") return "sobrepeso";
    if (bmi === "Obese") return "obeso";
    if (bmi === "Extremely obese") return "extremamente obeso";
    if (bmi === "Morbidly obese") return "obeso morbido";
    return "normal";
  } catch (error) {
    console.error(error);
    return "error";
  }
}

export async function putBmiCliente(clienteData: {
  altura_cliente: number;
  classificacao_bmi: string;
  id_cliente: number;
  peso_cliente: number;
}) {
  const apiUrl = "http://localhost:8080/bmi";
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clienteData),
  });
  return response.json();
}

export async function selectSonosByIdCliente(id_cliente: number) {
  const response = await fetch(`http://localhost:8080/sonos/${id_cliente}`);
  const data = await response.json();
  return data;
}

export async function deleteSonoById(id_sono: number) {
  const response = await fetch(`http://localhost:8080/sonos/${id_sono}`, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
}
