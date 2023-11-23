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
