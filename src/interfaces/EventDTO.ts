export interface EventDTO {
  id?: number | null;
  nome_evento: string;
  vlr_inscricao: string;
  qtd_inscricao_sorteio: number | null;
  data_hr_prova: string;
  regras: {
    id_evento: number;
    qtd_corrida: number | null;
    soma_nivel: number | null;
  }[];
  premios: {
    id_evento: number;
    posicao: number | null;
    premio: string;
  }[];
}
