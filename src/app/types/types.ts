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
  id_cliente: number;
  nome_cliente: string;
  data_nasc_cliente: string;
  usuario_cliente: string;
  senha_cliente: string;
};

export type login = {
  usuario: string;
  senha: string;
};
