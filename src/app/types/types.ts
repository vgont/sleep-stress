export type AIFeatures = {
  idade: number;
  tempo_atividade_fisica: number;
  duracao_sono: number;
};

export type AITargets = {
  nivel_estresse: number;
  qualidade_sono: number;
};

export type sonoData = {
  id_cliente: number;
  tempo_atividade_fisica: number;
  duracao_sono: number;
  nivel_estresse: string;
  qualidade_sono: string;
  data_sono: string;
};

export type cliente = {
  nome_cliente: string;
  data_nasc_cliente: string;
  usuario_cliente: string;
  senha_cliente: string;
  altura_cliente: number | null;
  peso_cliente: number | null;
  classificacao_bmi: string | null;
};

export type login = {
  usuario: string;
  senha: string;
};
